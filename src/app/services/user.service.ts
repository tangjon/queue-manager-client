import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  userList: Array<User>;
  constructor(public db: AngularFireDatabase) {
  }
  getUsers(): Observable<any[]> {
    return this.db.list('users').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  addUser(name:string, iNumber:string) {
    let newUser = new User(iNumber, name, this.db.createPushId())
    this.db.object('users/' + newUser.key).set(newUser)
  }

  getIncidentTotal(user: User) {
    var total = 0;
    for (var key in user.incidents) {
      total += parseInt(user.incidents[key])
    }
    return total;
  }

  getUserRole(user: User) {
    let role = user["role"];
    let list: Array<string> = [];
    Object.keys(role).forEach(el => {
      if (role[el] == true) {
        list.push(el);
      }
    })
    return list;
  }
  getRoleList(user: User) {
    let role = user["role"];
    let list: Array<string> = [];
    Object.keys(role).forEach(el => {
      list.push(el);
    })
    return list;
  }

  hasRole(user: User, role: string) {
    let ref = user["role"][role];
    return ref;
  }

  toggleRole(role: User) {

  }
}
