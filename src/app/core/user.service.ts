import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {catchError} from 'rxjs/operators/catchError'
import {forkJoin} from 'rxjs/observable/forkJoin'
import {IncidentSetService} from './incident-set.service';
import {RoleSetService} from './role-set.service';
import {UserSetService} from './user-set.service';
import {LogService} from './log.service';
import {environment} from "../../environments/environment";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {Support} from "../model/support";

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
              public roleSetService: RoleSetService,
              public userSetService: UserSetService,
              public logService: LogService) {
  }

  getUsers(): Observable<User[]> {
    return forkJoin([
      this.userSetService.getUserSet(),
      this.roleSetService.getRoleSet(),
      this.incidentSetService.getIncidentSet()
    ]).map(data => {
      const [userSet, supportSet, incidentSet] = data;
      let arr = [];
      Object.keys(userSet).forEach(key => {
        // populate the user set
        userSet[key].incidents = incidentSet[key];
        userSet[key].support = supportSet[key] || new Support();
        // if support set doesnt exist create it
        if (!supportSet[key]) {
          this.roleSetService.createRoleSet(key).subscribe(() => {
          })
        }
        arr.push(userSet[key])
      });
      // return as an array
      return arr;
    })
      .pipe(
      catchError(this.handleError)
    )
  }

  addUser(name: string, iNumber: string): Observable<User> {
    let key = this.db.createPushId();
    return forkJoin([
      this.userSetService.createUserSet(name, iNumber, key),
      this.roleSetService.createRoleSet(key),
      this.incidentSetService.createIncidentSet(key)
    ]).map((data: any[]) => {
      const [userSet, roleSet, incidentSet] = data;
      // put all together
      userSet.incidents = incidentSet;
      userSet.role = roleSet;
      return userSet;
    })
  }

  updateUser(user: User) {
    return this.userSetService.updateUserSet(user);
  }

  updateAvailability(user: User, bools: boolean) {
    return this.updateUser(user)
      .pipe(
        tap(() => this.logService.addLog(user, "Availability Changed", `Switched to ${user.getStatus()}`)
        ))
  }

  deleteUser(key: string): Observable<any> {
    // return this.http.delete(this.userDBEndpoint + '?key=' + "'" + key + "'");
    return this.userSetService.deleteUserSet(key).map(() => {
      return true;
    });
  }

  updateRole(user: User, role: string, bool: boolean) {
    let action = "";
    if (user.hasRole(role)) {
      action = "Unassigned"
    } else {
      action = "Assigned"
    }
    return this.roleSetService.updateRoleSet(user, role, bool)
      .pipe(
        tap(() => this.logService.addLog(user, "Support Changed", action + " " + role))
      )
  }

  updateIncident(user: User, type: string, amount: number) {
    let aString = "";
    if (user.getIncidentAmount(type) < amount) {
      aString = "Incident Assigned"
    } else {
      aString = "Incident Unassigned"
    }
    return this.incidentSetService.updateIncidentSet(user, type, amount)
      .pipe(
        tap(() => this.logService.addLog(user, aString, user.getIncidentAmount(type) + " to " + amount + " in " + type))
      )
  }

  resetRCC(user: User) {
    return this.userSetService.resetRCC(user)
  }

  resetIncidents(key) {
    return this.incidentSetService.resetIncidentSet(key);
  }

  updateQueueDays(user, amount) {
    let tmp = new User(user);
    tmp.currentQDays = amount;
    return this.updateUser(tmp).map(() => amount)
      .pipe(
        tap(() => this.logService.addLog(user, "Queue Days Changed", user.currentQDays + " to " + tmp.currentQDays))
      );
  }

  getUser(iNumber: string) {
    return this.getUsers().map((data: User[]) => {
      // filter array
      let user = data.find((user: User) => {
        return user.iNumber == iNumber;
      });
      if (!user) throw new Error("User Not Found");
      return user;
    });
  }

  // DEPRECATED
  deleteEverything() {
    // this.db.object('users').remove();
  }

  getQM(): Observable<User> {
    return this.http.get(this.qmapi, this.httpOptions).map((r: any) => {
      return r.d.INUMBER
    })
      .switchMap(iNumber => {
        return this.getUser(iNumber);
      })
  }

  setQM(iNumber: string) {
    return this.getUser(iNumber).switchMap(
      (user: User) => {
        // noinspection SpellCheckingInspection
        let body = {
          "INUMBER": user.iNumber
        };
        return this.http.put(this.qmapi, body, this.httpOptions)
      }
    )
  }

  private handleError(error: HttpErrorResponse) {
    console.log();
    // if (error.error instanceof ErrorEvent) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   console.error('An error occurred:', error.error.message);
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong,
    //   console.error(
    //     `Backend returned code ${error.status}, ` +
    //     `body was: ${error.error}`);
    //   console.log(error);
    // }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      "Are you using Chrome? OR Database requires to be restarted =(");
  };

}
