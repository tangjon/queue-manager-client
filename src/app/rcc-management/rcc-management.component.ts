import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';
import { parse } from 'url';

@Component({
  selector: 'app-rcc-management',
  templateUrl: './rcc-management.component.html',
  styleUrls: ['./rcc-management.component.css']
})
export class RccManagementComponent {
  selectedUser: User

  itemsRef: AngularFireList<any>;
  users: Observable<any[]>;
  constructor(public db: AngularFireDatabase) {
    this.itemsRef = db.list('users');
    this.users = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  selectUser(user) {
    this.selectedUser = user;
    console.log(user)
  }

  // Increment by one
  addQueueDay(user, val) {
    var qDays = parseInt(user.currentQDays);
    val = parseInt(val)
    this.db.object('users/' + user.key).update({ currentQDays: qDays + val })
  }

  updateQueueDays(user, val) {
    this.db.object('users/' + user.key).update({ currentQDays: +val })
  }

}
