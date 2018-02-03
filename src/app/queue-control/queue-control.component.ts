import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';
@Component({
  selector: 'app-queue-control',
  templateUrl: './queue-control.component.html',
  styleUrls: ['./queue-control.component.css']
})
export class QueueControlComponent {
  itemRef: AngularFireObject<any>;
  itemsRef: AngularFireList<any>;
  busyUsers: Observable<any[]>;
  users: Observable<any[]>;
  constructor(public db: AngularFireDatabase) {
    this.itemsRef = db.list('users', ref => ref.orderByChild('isAvailable').equalTo(true));
    this.users = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.itemsRef = db.list('users', ref => ref.orderByChild('isAvailable').equalTo(false));
    this.busyUsers = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  toggleAvailability(key, bool) {
    this.itemRef = this.db.object('users/' + key);
    this.itemRef.update({ isAvailable: bool })
  }

  incIncidentAmount(user) {
    var amount = 1;
    this.itemRef = this.db.object('users/' + user.key);
    this.itemRef.update({ totalIncident: user.totalIncident + 1 })
  }

  decIncidentAmount(user) {
    var amount = 1;
    this.itemRef = this.db.object('users/' + user.key);
    this.itemRef.update({ totalIncident: user.totalIncident-1 })
  }

  calculateAverageQDay(user) {
    var avg;
    if (user.usagePercent && user.currentQDays) {
      avg = user.totalIncident / (user.usagePercent * user.currentQDays);
    } else {
      avg = 0;
    }
    return parseFloat(avg).toFixed(2);
  }
  logIt(msg) {
    console.log(msg)
  }
}