import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/pluck';
import { RouteReuseStrategy } from '@angular/router';
import { UserService } from '../services/user.service';


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
  constructor(public db: AngularFireDatabase, private route: ActivatedRoute, private router: Router, public userService: UserService) {
    // Get Param :id in url
    this.id$ = this.route.params.pluck('id');
    this.id$.subscribe(value => {
      this.paramId = value;
      // Data for Available table
      this.users = userService.getUsers({
        key: "isAvailable",
        value: true
      }).map(_el => _el.filter(el => el.role[this.paramId] == true))

      // Data for UnAvailable table
      this.busyUsers = userService.getUsers({
        key: 'isAvailable',
        value: false
      }).map(_el => _el.filter(el => el.role[this.paramId] == true))
    });
  }

  ngOnInit(): void {

  }

  setAvailability(key, bool) {
    this.userService.setAvailable(key, bool)
  }

  incIncidentAmount(user: User) {
    let amount = 1;
    this.userService.updateIncident(user.key, this.paramId, this.getIncidentAmount(user) + amount)
  }

  decIncidentAmount(user) {
    let amount = 1;
    this.userService.updateIncident(user.key, this.paramId, this.getIncidentAmount(user) - amount)
  }
  // Get incident amount based on type
  getIncidentAmount(user: User) {
    return user.getIncidentAmount(this.paramId);
  }

  getIncidentTotal(user: User) {
    return user.getIncidentTotal();
  }

  calculateAverageQDay(user: User) {
    return user.getAverageQDay();
  }
  logIt(msg) {
    console.log(msg)
  }
}