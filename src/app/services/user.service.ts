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
import { ActivityBookService } from './activity-book.service';
import { filter } from 'rxjs/operator/filter';
import { IncidentSetService } from './incident-set.service';
import { RoleSetService } from './role-set.service';
import { UserSetService } from './user-set.service';

@Injectable()
export class UserService {
  private api: string = "https://qmdatabasep2000140239trial.hanatrial.ondemand.com/hana_hello/data.xsodata/users"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  constructor(public db: AngularFireDatabase, public http: HttpClient, public activityBookService: ActivityBookService,
    public incidentSetService: IncidentSetService,
    public roleSetService: RoleSetService,
    public userSetService: UserSetService) {
  }
  getUsers(): Observable<User[]> {
    return Observable.forkJoin([
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
    return Observable.forkJoin([
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
    // this.activityBookService.logUser(user);
    return this.userSetService.updateUserSet(user);
  }
  deleteUser(key: string): Observable<any> {
    // return this.http.delete(this.userDBEndpoint + '?key=' + "'" + key + "'");
    return this.userSetService.deleteUserSet(key).map(r => {
      return true;
    });
  }
  updateRole(user: User, role: string, bool: boolean) {
    return this.roleSetService.updateRoleSet(user, role, bool)
  }
  updateIncident(user: User, type: string, amount: number) {
    this.activityBookService.logIncident(user, type, amount);
    return this.incidentSetService.updateIncidentSet(user, type, amount);
  }
  resetRCC(user: User) {
    return this.userSetService.resetRCC(user)
  }
  resetIncidents(key) {
    return this.incidentSetService.resetIncidentSet(key);
  }
  updateQueueDays(user, amount) {
    this.getUserName("i13");
    let tmp = new User(user);
    tmp.currentQDays = amount;
    this.activityBookService.logEntry(user, "Queue Days Changed", user.currentQDays + " to " + tmp.currentQDays)
    return this.updateUser(tmp);
  }
  getUserName(iNumber: string) {
    return this.getUsers().map((data: User[]) => {
      // filter array
      let tmp = data.filter((user: User) => {
        return user.iNumber == iNumber;
      })
      return tmp;
    });
  }
  // DEPRICATED
  deleteEverything() {
    // this.db.object('users').remove();
  }

}
