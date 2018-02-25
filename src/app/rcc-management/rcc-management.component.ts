import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';
import { parse } from 'url';
import { UserService } from '../services/user.service';
import { Incidents } from '../model/incidents';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-rcc-management',
  templateUrl: './rcc-management.component.html',
  styleUrls: ['./rcc-management.component.css']
})
export class RccManagementComponent implements OnInit {

  users: Observable<any[]>;
  showSpinner: boolean = true;
  _userList: Array<User>;
  errorMessage: string;

  currentDate: Date;
  nextResetDate: Date;
  lastResetDate: Date;
  constructor(public db: AngularFireDatabase, public userSerivice: UserService, public logService: LogService) {
    this.userSerivice.getUsers().subscribe(r => {
      this.showSpinner = false;
      this._userList = r.sort(function (a, b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      });
    }, error => {
      this.errorMessage = error;
    })
  }

  ngOnInit(): void {
    this.currentDate = new Date();
  }

  // Increment by one
  addQueueDay(user) {
    let pVal = prompt(`Enter the amount you want to add for ${user.name}`);
    // parse value
    let amount = parseInt(pVal);
    if (!isNaN(amount)) {
      if (window.confirm(`${user.name} will have ${user.currentQDays} increased by ${amount} to ${user.currentQDays + amount}. \nClick okay to confirm`)) {
        let newAmount = user.currentQDays + amount;
        this.userSerivice.updateQueueDays(user, newAmount).subscribe(r => {
          user.currentQDays = r;
          console.log(r);
        })
      }
    }
  }

  updateQueueDays(user) {
    let pVal = prompt(`Enter the amount you want to overwrite for ${user.name}`);
    // parse value
    let amount = parseInt(pVal);
    if (!isNaN(amount)) {
      if (window.confirm(`${user.name} will have ${user.currentQDays} CHANGED TO ${amount}. \nClick okay to confirm`)) {
        let newAmount = amount;
        this.userSerivice.updateQueueDays(user, newAmount).subscribe(r => {
          user.currentQDays = r;
          console.log(r);
        })
      }
    }
  }
  // Oct-Dec = 1
  // Jan-Mar = 2
  // Apr-Jun = 3
  // Jul-Sep = 4
  getQuarter(d) {
    d = d || new Date(); // If no date supplied, use today
    var q = [2, 3, 4, 1];
    return q[Math.floor(d.getMonth() / 3)];
  }
  daysLeftInQuarter(d) {
    d = d || new Date();
    // d.setDate(d.getDate() + 43)
    var qEnd: any = new Date(d);
    qEnd.setMonth(qEnd.getMonth() + 3 - qEnd.getMonth() % 3, 0);
    return Math.floor((qEnd - d) / 8.64e7);
  }

  getResetDays() {
    let daysLeft = this.daysLeftInQuarter(new Date());
    return daysLeft
  }

  resetRCC() {
    let prompt = window.confirm("Are you sure you want to reset queue days?\nPlease double check!\nIt may already be done!");
    if (prompt) {
      this._userList.forEach((el: User) => {
        if (el.currentQDays != 0) {
          this.userSerivice.resetRCC(el).subscribe(r => {
            el.currentQDays = 0;
          })
        }
      });
    }
  }

  resetAllIncidents() {
    let prompt = window.confirm("Are you sure you want to reset incident count for all users?\nPlease double check!\nIt may already be done!");
    if (prompt) {
      this._userList.forEach((user: User) => {
        this.userSerivice.resetIncidents(user.key).subscribe(r => {
          user.incidents.reset();
        })
      })
    }
  }
  resetActivityLog() {
    let prompt = window.confirm("Are you sure you want to reset incident count for all users?\nPlease double check!\nIt may already be done!");
    if (prompt) {
      this.logService.purgeLogs();
    }
  }

  masterReset() {
    this.resetActivityLog();
    this.resetAllIncidents();
    this.resetActivityLog();
  }

  logIt(msg) {
    console.log(msg);
  }
}
