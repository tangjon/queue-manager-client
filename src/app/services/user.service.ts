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
    return this.db.list('users').valueChanges().map(el => {
      return el.map(user => { return new User(user) })
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

  updateUser(key: string, fName: string, iNumber: string, usage: number) {
    usage = +usage;
    this.db.list('users').update(key, {
      name: fName,
      iNumber: iNumber,
      usagePercent: usage
    });
  }

  deleteEverything() {
    this.db.object('users').remove();
  }

  toggleRole(user: User, role: string) {
    let bool = user.hasRole(role);
    console.log(bool);
    let ref = this.db.object('users/' + user.key + '/role/' + role);
    ref.set(!bool);
  }
}
