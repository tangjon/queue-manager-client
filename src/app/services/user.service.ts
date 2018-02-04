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
    console.log("hello")
    return this.db.list('users').valueChanges().map(el=> {
      return el.map( user => { return new User(user) })
    })
  }

  addUser(name: string, iNumber: string) {
    let newUser = new User({
      iNumber: iNumber,
      name: name,
      key: this.db.createPushId()
    })
    this.db.object('users/' + newUser.key).set(newUser)
  }

  updateUser(user: User, fName: string, iNumber: string, usage: number) {
    usage = +usage;
    this.db.list('users').update(user.key, {
      name: fName,
      iNumber: iNumber,
      usagePercent: usage
    });
  }

  deleteEverything() {
    this.db.object('users').remove();
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
