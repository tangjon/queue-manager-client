import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {BehaviorSubject, forkJoin, Observable, of, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LogService} from './log.service';
import {environment} from "../../environments/environment";
import {User} from "../shared/model/user";
import {Helper} from "../shared/helper/helper";
import {ActiondId, ActionEntryLog} from "../shared/model/actionEntryLog";
import {Detail} from "../shared/model/detail";

@Injectable()
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  /* ERROR MESSAGES */
  USER_NOT_FOUND = "USER NOT FOUND";
  private userapi: string = environment.api + '/users';
  private qmapi: string = environment.api + '/users/qm';
  private incidentapi: string = environment.api + '/incidents';
  private productapi: string = environment.api + '/products';
  private userSource = new BehaviorSubject<User[]>([]);

  constructor(public db: AngularFireDatabase,
              public http: HttpClient,
              public logService: LogService,) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get(this.userapi).pipe(
      map((resp: any) => {
          // verify response
          if (resp.code === 200) {
            return resp.data.map(el =>
              // populate the User Model
              new User(el.user_id, el.first_name, el.last_name, el.is_available,
                el.current_q_days, el.incident_threshold, el.usage_percent,
                el.incident_counts, el.supported_products)
            ).sort(function (a, b) {
              if (a.firstName < b.firstName) {
                return -1;
              }
              if (a.firstName > b.firstName) {
                return 1;
              }
              return 0;
            });
          }
          throw new Error(resp.code);
        }
      ),
      catchError((e) => Helper.handleError(e, "Failed to get users"))
    );
  }

  getUserByNumber(iNumber: string): Observable<any> {
    if (!iNumber) {
      throw new Error("Empty Argument");
    }
    const url = `${this.userapi}/${iNumber}`;
    return this.http.get(url).pipe(
      map((resp: any) => {
        if (resp.code === 200) {
          return new User(resp.data.user_id, resp.data.first_name, resp.data.last_name,
            resp.data.is_available, resp.data.current_q_days, resp.data.incident_threshold,
            resp.usage_perecent, resp.data.incident_counts, resp.data.supported_products);
        }
        throw new Error("User not found");
      }),
      catchError((e) => Helper.handleError(e, "Failed to get user"))
    );
  }

  addUser(firstName: string, iNumber: string): Observable<User> {
    const body = {
      "user_id": iNumber,
      "first_name": firstName,
      "last_name": ""
    };
    return this.http.post(this.userapi, body, this.httpOptions)
      .pipe(
        switchMap((resp: any) => {
          if (resp.code == 201) {
            return this.getUserByNumber(iNumber);
          }
          return throwError(new Error("User does not exist"));
        }),
        catchError(e => Helper.handleError(e, "Failed to Add User"))
      );
  }

  updateUserMeta(user: User) {
    const body = user.generateMetaBody();
    return this.http.put(`${this.userapi}/${user.iNumber}`, body, this.httpOptions)
      .pipe(
        catchError(e => Helper.handleError(e, "Update User Meta Failed"))
      );
  }

  updateAvailability(user: User, bool: boolean): Observable<any> {
    const body = this.buildBodyFromUserObject(user);
    body.is_available = bool;

    return this.http.put(this.userapi + '/' + user.iNumber, body, this.httpOptions)
      .pipe(
        tap(() => this.logService.addLog(user, ActiondId.AVAILABILITY_CHANGED,
          new Detail(user.getStatus(), user.isAvailable ? "BUSY" : "AVAILABLE", ""))),
        catchError(e => Helper.handleError(e, "Update Availability Failed"))
      );
  }

  deleteUser(iNumber: string) {
    return this.http.delete(`${this.userapi}/${iNumber}`)
      .pipe(
        catchError(e => Helper.handleError(e, "Failed to delete user"))
      );
  }

  updateSupport(user: User, productShortName: string, bool: boolean) {
    const body = {
      "supported": bool
    };
    return this.http.put(`${this.userapi}/${user.iNumber}/${productShortName}`, body, this.httpOptions)
      .pipe(
        map((res: any) => {
          if (res.code === 200) {
            return res;
          }
          throw new Error("User not found");
        }),
        tap(() => this.logService.addLog(user, ActiondId.PRDOUCT_SUPPORT_CHANGED,
          new Detail().addCustomDetail(user.hasRole(productShortName) ? "Removed " + productShortName : "Added " + productShortName))),
        catchError(e => Helper.handleError(e, "Failed to update support"))
      );

  }

  addIncident(user: User, productShortName: string): Observable<any> {
    const body = {
      "product_short_name": productShortName,
      "user_id": user.iNumber
    };
    return this.http.post(this.incidentapi, body, this.httpOptions)
      .pipe(
        tap(() => this.logService.addLog(user, ActiondId.INCIDENT_ASSIGNED,
          new Detail(user.incidentCounts[productShortName], user.incidentCounts[productShortName] + 1, productShortName))),
        catchError(e => Helper.handleError(e, "Add Incident Failed")));
  }

  removeIncident(user: User, productShortName: string): Observable<any> {
    const body = {
      "user_id": user.iNumber,
      "product_short_name": productShortName
    };
    return this.http.delete(this.incidentapi + `/${user.iNumber}/${productShortName}`, this.httpOptions)
      .pipe(
        tap(() => this.logService.addLog(user, ActiondId.INCIDENT_UNASSIGNED,
          new Detail(user.incidentCounts[productShortName], user.incidentCounts[productShortName] - 1, productShortName))),
        catchError(e => Helper.handleError(e, "Remove Incident Failed")));
  }

  /** @deprecated do not use this */
  restQueueDays(user: User) {
    return of(5);
  }

  resetAllUser() {
    return forkJoin(
      [
        this.http.post(this.incidentapi + '/reset', {'reset_boolean': true}, this.httpOptions),
        this.http.post(this.userapi + '/reset', {'reset_boolean': true}, this.httpOptions)
      ]
    ).pipe(
      catchError(e => Helper.handleError(e, "Reset User Failed"))
    );
  }

  updateQueueDays(user, amount) {
    const requestUser = User.copy(user);
    requestUser.currentQDays = amount;
    return this.updateUserMeta(requestUser)
      .pipe(
        map(() => amount),
        tap(() => this.logService.addLog(user, ActiondId.QUEUE_DAYS_CHANGED,
          new Detail(user.currentQDays, amount, "Queue Days"))),
        catchError(e => Helper.handleError(e, "Update Queue Days Failed"))
      );
  }


  getQM(): Observable<User> {
    return this.http.get<User>(this.qmapi).pipe(
      map((r: any) => {
        if (r.code !== 200) {
          throw new Error("error");
        }
        return new User(r.data.user_id, r.data.first_name, r.data.last_name,
          r.data.is_available, r.data.current_q_days, r.data.incident_threshold,
          r.usage_percent, r.data.incident_counts, r.data.supported_products);
      }),
      catchError((e: any) => Helper.handleError(e, "Failed to get QM"))
    );
  }

  setQM(iNumber: string) {
    let user;
    return this.getUserByNumber(iNumber).pipe(switchMap(
      (u: User) => {
        user = u;
        // noinspection SpellCheckingInspection
        const body = {
          "user_id": u.iNumber
        };
        return this.http.put(this.qmapi, body, this.httpOptions);
      }
    )).pipe(
      tap(() => this.logService.addLog(user, ActiondId.QM_CHANGED,
        new Detail().addCustomDetail("QM Changed to " + user.name()))),
      catchError(e => Helper.handleError(e, "Failed to set QM")));
  }

  getUserIncidents(iNumber: string) {
    return this.http.get(this.userapi + `/${iNumber}/incidents`).pipe(catchError(e => Helper.handleError(e, "Failed to get Incidents")));
  }

  private buildBodyFromUserObject(user: User) {
    return {
      "user_id": user.iNumber,
      "first_name": user.firstName,
      "last_name": user.lastName,
      "is_available": user.isAvailable,
      "usage_percent": user.usagePercent,
      "current_q_days": user.currentQDays,
      "incident_threshold": user.iThreshold
    };
  }


  getLastQueueDayChange() {
    return forkJoin([this.logService.getLogsAsObservable(), this.getUsers()]).pipe(map((res) => {
        let users = res[1], logs = res[0];
        let obj = {}; // stores date of last queue day change
        users.forEach((u: User) => {
          let userLog = logs.find((log: ActionEntryLog) => log.actionId === ActiondId.QUEUE_DAYS_CHANGED && u.iNumber === log.affectedInumber);
          obj[u.iNumber] = userLog ? `${userLog.getDateFormatted()} ${userLog.getTimeFormatted()}` : "";
        });
        return obj;
      })
    );
  }
}
