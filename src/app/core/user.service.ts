import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {LogService} from './log.service';
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {User} from "../shared/model/user";
import 'rxjs/add/observable/throw';
import {Helper} from "../shared/helper/helper";
import {ActiondId} from "../shared/model/actionEntryLog";
import {Detail} from "../shared/model/detail";

@Injectable()
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  /* ERROR MESSAGES */
  USER_NOT_FOUND: string = "USER NOT FOUND";
  private userapi: string = environment.api + '/users';
  private qmapi: string = environment.api + '/users/qm';
  private incidentapi: string = environment.api + '/incidents';
  private productapi: string = environment.api + '/products';
  private userSource = new BehaviorSubject<User[]>([]);

  constructor(public db: AngularFireDatabase,
              public http: HttpClient,
              public logService: LogService,
  ) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get(this.userapi)
      .map((resp: any) => {
          // verify response
          if (resp.code === 200) {
            return resp.data.map(el =>
              // populate the User Model
              new User(el.user_id, el.first_name, el.last_name, el.is_available, el.current_q_days, el.incident_threshold, el.usage_percent, el.incident_counts, el.supported_products)
            )
          } else {
            throw new Error(resp.code)
          }
      }).pipe(
        catchError((e) => Helper.handleError(e, "Failed to get users"))
      )
  }

  getUserByNumber(iNumber: string): Observable<User> {
    if (!iNumber) throw new Error("Empty Argument");
    const url = `${this.userapi}/${iNumber}`;
    return this.http.get(url).map((resp: any) => {
      if (resp.code === 200) {
        return new User(resp.data.user_id, resp.data.first_name, resp.data.last_name, resp.data.is_available, resp.data.current_q_days, resp.data.incident_threshold, resp.usage_perecent, resp.data.incident_counts, resp.data.supported_products)
      } else {
        throw new Error("User not found")
      }
    })
      .pipe(
        catchError((e) => Helper.handleError(e, "Failed to get user"))
      )
  }

  addUser(firstName: string, iNumber: string): Observable<User> {
    let body = {
      "user_id": iNumber,
      "first_name": firstName,
      "last_name": ""
    };
    return this.http.post(this.userapi, body, this.httpOptions).switchMap((resp:any) => {
      if (resp.code == 201) return this.getUserByNumber(iNumber);
      throw Error();
    }).pipe(
      catchError(e => Helper.handleError(e, "Failed to Add User"))
    )
  }

  updateUserMeta(user: User) {
    const body = user.generateMetaBody();
    return this.http.put(`${this.userapi}/${user.iNumber}`, body, this.httpOptions)
      .pipe(
        catchError(e => Helper.handleError(e, "Update User Meta Failed"))
      )
  }

  updateAvailability(user: User, bool: boolean): Observable<any> {
    let body = this.buildBodyFromUserObject(user);
    body.is_available = bool;

    return this.http.put(this.userapi + '/' + user.iNumber, body, this.httpOptions)
      .pipe(
        tap(() => this.logService.addLog(user, ActiondId.AVAILABILITY_CHANGED,
          new Detail(user.getStatus(), user.isAvailable ? "BUSY" : "AVAILABLE", ""))),
        catchError(e => Helper.handleError(e, "Update Availability Failed"))
      )
  }

  deleteUser(iNumber: string) {
    return this.http.delete(`${this.userapi}/${iNumber}`)
      .pipe(
        catchError(e => Helper.handleError(e, "Failed to delete user"))
      )
  }

  updateSupport(user: User, productShortName: string, bool: boolean) {
    const body = {
      "supported": bool
    };
    return this.http.put(`${this.userapi}/${user.iNumber}/${productShortName}`, body, this.httpOptions).map((res: any) => {
      if (res.code === 200) {
        return res;
      } else {
        throw new Error();
      }
    }).pipe(catchError(e => Helper.handleError(e, "Failed to update support")))
  }

  addIncident(user: User, productShortName: string): Observable<any> {
    let body = {
      "product_short_name": productShortName,
      "user_id": user.iNumber
    };
    return this.http.post(this.incidentapi, body, this.httpOptions)
      .pipe(
        tap(()=> this.logService.addLog(user,ActiondId.INCIDENT_ASSIGNED,
          new Detail(user.incidentCounts[productShortName],user.incidentCounts[productShortName]+1, productShortName))),
        catchError(e => Helper.handleError(e, "Add Incident Failed")))
  }

  removeIncident(user: User, productShortName: string): Observable<any> {
    const body = {
      "user_id": user.iNumber,
      "product_short_name": productShortName
    };
    return this.http.delete(this.incidentapi + `/${user.iNumber}/${productShortName}`, this.httpOptions)
      .pipe(
        tap(()=> this.logService.addLog(user,ActiondId.INCIDENT_UNASSIGNED,
          new Detail(user.incidentCounts[productShortName],user.incidentCounts[productShortName]-1, productShortName))),
        catchError(e => Helper.handleError(e, "Remove Incident Failed")))
  }

  // TODO Refactor out, redundant and sub-clone of #Update Queue Days
  restQueueDays(user: User) {
    return Observable.of(5)
    // let tmp = new User(user);
    // tmp.currentQDays = 0;
    // return this.userSetService.resetRCC(tmp)
    //   .pipe(catchError(e => Helper.handleError(e, "Reset Queue Days Failed")));
  }

  updateQueueDays(user, amount) {
    let requestUser = User.copy(user);
    requestUser.currentQDays = amount;
    return this.updateUserMeta(requestUser).map(() => amount)
      .pipe(catchError(e => Helper.handleError(e, "Update Queue Days Failed")));
  }

  getQM(): Observable<User> {
    return this.http.get(this.qmapi).map((resp: any) => {
      if (resp.code !== 200) throw new Error("error");
      return new User(resp.data.user_id, resp.data.first_name, resp.data.last_name, resp.data.is_available, resp.data.current_q_days, resp.data.incident_threshold, resp.usage_percent, resp.data.incident_counts, resp.data.supported_products)
    }).pipe(catchError(e => Helper.handleError(e, "Failed to get QM")))
  }

  setQM(iNumber: string) {
    return this.getUserByNumber(iNumber).switchMap(
      (user: User) => {
        // noinspection SpellCheckingInspection
        const body = {
          "user_id": user.iNumber
        };
        return this.http.put(this.qmapi, body, this.httpOptions);
      }
    ).pipe(catchError(e => Helper.handleError(e, "Failed to set QM")))
  }

  getUserIncidents(iNumber:string){
    return this.http.get(this.userapi + `/${iNumber}/incidents`).pipe(catchError(e => Helper.handleError(e, "Failed to get Incidents")))
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
    }
  }

}
