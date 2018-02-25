import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpParams } from '@angular/common/http/src/params';
import { Incidents } from '../model/incidents';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { EntryLog } from '../model/entrylog';
import { ActivityBook } from '../model/activitybook';
import { filter } from 'rxjs/operator/filter';
import { forkJoin } from 'rxjs/observable/forkJoin'
import { IncidentSetService } from './incident-set.service';
import { RoleSetService } from './role-set.service';
import { UserSetService } from './user-set.service';
import { LogService } from './log.service';

@Injectable()
export class UserService {
  private api: string = "https://qmdatabasep2000140239trial.hanatrial.ondemand.com/hana_hello/data.xsodata/users"
  private qmapi: string = "https://qmdatabasep2000140239trial.hanatrial.ondemand.com/hana_hello/data.xsodata/qm('current')"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  constructor(public db: AngularFireDatabase,
    public http: HttpClient,
    public incidentSetService: IncidentSetService,
    public roleSetService: RoleSetService,
    public userSetService: UserSetService,
    public logService: LogService) { }

  getUsers(): Observable<User[]> {
    return forkJoin([
      this.userSetService.getUserSet(),
      this.roleSetService.getRoleSet(),
      this.incidentSetService.getIncidentSet()
    ]).map(data => {
      const [userSet, roleSet, incidentSet] = data;
      let arr = [];
      Object.keys(userSet).forEach(key => {
        // populate the user set
        userSet[key].incidents = incidentSet[key];
        userSet[key].role = roleSet[key];
        arr.push(userSet[key])
      });
      // return as an array
      return arr;
    })

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
  updateAvailability(user: User, bool: boolean) {
    console.log(user.getStatus())
    this.logService.addLog(user, "Availability Changed", `Switched to ${user.getStatus()}`);
    return this.updateUser(user)
  }

  deleteUser(key: string): Observable<any> {
    // return this.http.delete(this.userDBEndpoint + '?key=' + "'" + key + "'");
    return this.userSetService.deleteUserSet(key).map(r => {
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
    this.logService.addLog(user, "Role Changed", action + " " + role);
    return this.roleSetService.updateRoleSet(user, role, bool)
  }
  updateIncident(user: User, type: string, amount: number) {
    let aString = "";
    if (user.getIncidentAmount(type) < amount) {
      aString = "Incident Assigned"
    } else {
      aString = "Incident Unassigned"
    }
    this.logService.addLog(user, aString, user.getIncidentAmount(type) + " to " + amount + " in " + type);
    return this.incidentSetService.updateIncidentSet(user, type, amount);
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
    this.logService.addLog(user, "Queue Days Changed", user.currentQDays + " to " + tmp.currentQDays)
    return this.updateUser(tmp).map(r=>amount);
  }
  getUser(iNumber: string) {
    return this.getUsers().map((data: User[]) => {
      // filter array
      let user = data.find((user: User) => {
        return user.iNumber == iNumber;
      })
      if (!user) throw new Error("User Not Found")
      return user;
    });
  }
  // DEPRICATED
  deleteEverything() {
    // this.db.object('users').remove();
  }

  getQM(): Observable<User> {
    return this.http.get(this.qmapi, this.httpOptions).map((r: any) => { return r.d.INUMBER })
      .switchMap(iNumber => {
        return this.getUser(iNumber);
      })
  }

  setQM(iNumber: string) {
    return this.getUser(iNumber).switchMap(
      (user: User) => {
        let body = {
          "INUMBER": user.iNumber
        }
        return this.http.put(this.qmapi, body, this.httpOptions)
      }
    )
  }

}
