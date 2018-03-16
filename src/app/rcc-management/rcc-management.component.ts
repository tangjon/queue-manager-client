import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user';
import {UserService} from '../core/user.service';
import {LogService} from '../core/log.service';

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

  constructor(public db: AngularFireDatabase, public userService: UserService, public logService: LogService) {
    this.userService.getUsers().subscribe(r => {
      this.showSpinner = false;
      this._userList = r.sort(function (a, b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      });
    }, error => {
      this.errorMessage = error.message;
    })
  }

  ngOnInit(): void {
    this.currentDate = new Date();
  }

  // Increment by one
  addQueueDay(user) {
    let pVal = prompt(`Enter the amount you want to add for ${user.name}`);
    // parse value
    let amount = parseFloat(pVal);
    if (!isNaN(amount)) {
      if (window.confirm(`${user.name} will have ${user.currentQDays} increased by ${amount} to ${user.currentQDays + amount}. \nClick okay to confirm`)) {
        let newAmount = user.currentQDays + amount;
        this.userService.updateQueueDays(user, newAmount).subscribe(r => {
          user.currentQDays = r;
        })
      }
    }
  }

  updateQueueDays(user) {
    let pVal = prompt(`Enter the amount you want to overwrite for ${user.name}`);
    // parse value
    let amount = parseFloat(pVal);
    if (!isNaN(amount)) {
      if (window.confirm(`${user.name} will have ${user.currentQDays} CHANGED TO ${amount}. \nClick okay to confirm`)) {
        this.userService.updateQueueDays(user, amount).subscribe(r => {
          user.currentQDays = r;
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
    let q = [2, 3, 4, 1];
    return q[Math.floor(d.getMonth() / 3)];
  }
  daysLeftInQuarter(d) {
    d = d || new Date();
    // d.setDate(d.getDate() + 43)
    const qEnd: any = new Date(d);
    qEnd.setMonth(qEnd.getMonth() + 3 - qEnd.getMonth() % 3, 0);
    return Math.floor((qEnd - d) / 8.64e7);
  }

  getResetDays() {
    return this.daysLeftInQuarter(new Date())
  }

  resetRCC() {
    let prompt = window.confirm("Are you sure you want to reset queue days?\nPlease double check!\nIt may already be done!");
    if (prompt) {
      this._userList.forEach((el: User) => {
        if (el.currentQDays != 0) {
          // TODO RESET
          // this.userService.resetRCC(el).subscribe(() => {
          //   el.currentQDays = 0;
          // })
        }
      });
    }
  }

  resetAllIncidents() {
    let prompt = window.confirm("Are you sure you want to reset incident count for all users?\nPlease double check!\nIt may already be done!");
    if (prompt) {
      this._userList.forEach((user: User) => {
        // TODO RESET
        // this.userService.resetIncidents(user.key).subscribe(() => {
        //   user.incidentBook.reset();
        // })
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
    this.resetRCC();
  }

  logIt(msg) {
    console.log(msg);
  }
}
