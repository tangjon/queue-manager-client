import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {IncidentSetService} from './incident-book-set.service';
import {RoleSetService} from './support-set.service';
import {UserSetService} from './user-set.service';
import {LogService} from './log.service';
import {environment} from "../../environments/environment";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {IncidentBookService} from "./incident-book.service";
import {SupportBookService} from "./support-book.service";

@Injectable()
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  private qmapi: string = environment.apiUrl + "qm('current')";

  constructor(public db: AngularFireDatabase,
              public http: HttpClient,
              public incidentSetService: IncidentSetService,
              public supportSetService: RoleSetService,
              public userSetService: UserSetService,
              public logService: LogService,
              public incidentBookService: IncidentBookService,
              public supportBookService: SupportBookService) {
    incidentBookService.setCount('-L6NWB0vTHL_YJzPVshf', 'NW', 10);
  }

  getUsers(): Observable<User[]> {
    this.supportBookService.initializeUser('dasd sadsa');
    return this.userSetService.getUserSetArray().switchMap((users: User[]) => {
      const userbatch$ = [];
      users.forEach(user => {
        userbatch$.push(
          forkJoin([this.incidentBookService.get(user.key), this.supportBookService.get(user.key)])
            .map(data => {
              const [incidentBook, supportBook] = data;
              user.incidentBook.set(incidentBook);
              user.support.set(supportBook);
              return user;
            })
        );
      });
      return forkJoin(userbatch$);
    });
  }

  addUser(name: string, iNumber: string): Observable<User> {
    const UID = this.db.createPushId();
    return forkJoin([
      this.userSetService.createUserSet(name, iNumber, UID),
      this.supportBookService.initializeUser(UID),
      this.incidentBookService.initializeUser(UID)
    ]).map(data => {
        const [userFrag, supportFrag, incidentFrag] = data;
        const newUser = new User(userFrag);
        newUser.incidentBook.set(incidentFrag);
        newUser.support.set(supportFrag);
        return newUser;
      }
    );
  }

  // addUser(name: string, iNumber: string): Observable<User> {
  //   const key = this.db.createPushId();
  //   this.createUser(name, iNumber);
  //   return forkJoin([
  //     this.userSetService.createUserSet(name, iNumber, key),
  //     this.supportSetService.createSupportSet(key),
  //     this.incidentSetService.createIncidentSet(key)
  //   ]).map((data: any[]) => {
  //     const [userSet, roleSet, incidentSet] = data;
  //     // put it all together
  //     userSet.incidents = incidentSet;
  //     userSet.role = roleSet;
  //     return userSet;
  //   });
  // }

  updateUser(user: User) {
    return this.userSetService.updateUserSet(user);
  }

  updateAvailability(user: User, bools: boolean) {
    return this.updateUser(user)
      .pipe(
        tap(() => this.logService.addLog(user, "Availability Changed", `Switched to ${user.getStatus()}`)
        ));
  }

  deleteUser(key: string): Observable<any> {
    // return this.http.delete(this.userDBEndpoint + '?key=' + "'" + key + "'");
    return this.userSetService.deleteUserSet(key).map(() => {
      return true;
    });
  }

  updateSupport(user: User, productId: string, bool: boolean) {
    let action = "";
    if (user.hasRole(productId)) {
      action = "Unassigned";
    } else {
      action = "Assigned";
    }

    return this.supportBookService.setSupport(user.key, productId, bool)
      .pipe(
        tap(() => this.logService.addLog(user, "SupportBook Changed", action + " " + productId))
      );
  }

  updateIncident(user: User, productId: string, amount: number) {
    let aString = "";
    if (user.getIncidentAmount(productId) < amount) {
      aString = "Incident Assigned";
    } else {
      aString = "Incident Unassigned";
    }

    return this.incidentBookService.setCount(user.key,productId,amount)
      .pipe(
        tap(() => this.logService.addLog(user, aString, user.getIncidentAmount(productId) + " to " + amount + " in " + productId))
      );
  }

  resetRCC(user: User) {
    return this.userSetService.resetRCC(user);
  }

  resetIncidents(key) {
    return this.incidentSetService.resetIncidentSet(key);
  }

  updateQueueDays(user, amount) {
    const tmp = new User(user);
    tmp.currentQDays = amount;
    return this.updateUser(tmp).map(() => amount)
      .pipe(
        tap(() => this.logService.addLog(user, "Queue Days Changed", user.currentQDays + " to " + tmp.currentQDays))
      );
  }

  getUser(iNumber: string) {
    return this.getUsers().map((data: User[]) => {
      // filter array
      const user = data.find((user: User) => {
        return user.iNumber == iNumber;
      });
      if (!user) {
        throw new Error("User Not Found");
      }
      return user;
    });
  }

  // DEPRECATED
  deleteEverything() {
    // this.db.object('users').remove();
  }

  getQM(): Observable<User> {
    return this.http.get(this.qmapi, this.httpOptions).map((r: any) => {
      return r.d.INUMBER;
    })
      .switchMap(iNumber => {
        return this.getUser(iNumber);
      });
  }

  setQM(iNumber: string) {
    return this.getUser(iNumber).switchMap(
      (user: User) => {
        // noinspection SpellCheckingInspection
        const body = {
          "INUMBER": user.iNumber
        };
        return this.http.put(this.qmapi, body, this.httpOptions);
      }
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      console.log(error);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      "Are you using Chrome? OR Database requires to be restarted =(");
  }

}
