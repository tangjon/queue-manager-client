import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/pluck';
import { RouteReuseStrategy } from '@angular/router';


@Component({
  selector: 'app-queue-control',
  templateUrl: './queue-control.component.html',
  styleUrls: ['./queue-control.component.css']
})
export class QueueControlComponent implements OnInit {

  itemRef: AngularFireObject<any>;
  itemsRef: AngularFireList<any>;
  busyUsers: Observable<any[]>;
  users: Observable<any[]>;
  id$: Observable<string>;
  paramId: string;
  constructor(public db: AngularFireDatabase, private route: ActivatedRoute, private router: Router) {
    // Data for Available table
    this.itemsRef = db.list('users', ref => ref.orderByChild('isAvailable').equalTo(true));
    this.users = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    // Data for UnAvailable table
    this.itemsRef = db.list('users', ref => ref.orderByChild('isAvailable').equalTo(false));
    this.busyUsers = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  ngOnInit(): void {
    // Get Param :id in url
    this.id$ = this.route.params.pluck('id');
    this.id$.subscribe(value => {
      this.paramId = value;
    })
  }

  toggleAvailability(key, bool) {
    this.itemRef = this.db.object('users/' + key);
    this.itemRef.update({ isAvailable: bool })
  }

  incIncidentAmount(user: User) {
    let amount = 1;
    this.itemRef = this.db.object('users/' + user.key + '/incidents/' + this.paramId);
    this.itemRef.set(this.getIncidentAmount(user) + amount);
  }

  decIncidentAmount(user) {
    let amount = 1;
    this.itemRef = this.db.object('users/' + user.key + '/incidents/' + this.paramId);
    this.itemRef.set(this.getIncidentAmount(user) - amount);
  }
  // Get incident amount based on type
  getIncidentAmount(user: User) {
    let amount = 0;
    switch (this.paramId) {
      case "NW":
        amount = user.incidents.NW
        break;
      case "MS":
        amount = user.incidents.MS
        break;
      case "SA":
        amount = user.incidents.SA
        break;
      case "SM":
        amount = user.incidents.SM
        break;
      case "FC_EA_IC_FIM":
        amount = user.incidents.FC_EA_IC_FIM
        break;
      case "DSM":
        amount = user.incidents.DSM
        break;
      case "RTC":
        amount = user.incidents.RTC
        break;
      case "LOD_ANA_PL":
        amount = user.incidents.LOD_ANA_PL
        break;
      case "PCM":
        amount = user.incidents.PCM
        break;
    }
    return amount;
  }

  getIncidentTotal(user: User) {
    var total = 0;
    for (var key in user.incidents) {
      total += parseInt(user.incidents[key])
    }
    return total;
  }

  calculateAverageQDay(user: User) {
    var avg;
    if (user.usagePercent && user.currentQDays) {
      avg = this.getIncidentTotal(user) / (user.usagePercent * user.currentQDays);
    } else {
      avg = 0;
    }
    return parseFloat(avg).toFixed(2);
  }
  logIt(msg) {
    console.log(msg)
  }
}