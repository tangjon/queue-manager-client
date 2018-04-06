import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {User} from '../../shared/model/user';
import {UserService} from '../../core/user.service';
import {LogService} from '../../core/log.service';
import {MatSnackBar} from "@angular/material";
import * as $ from 'jquery';
import {BsModalService} from "ngx-bootstrap";
import {ModalConfirmComponent} from "../../shared/components/modals/modal-confirm/modal-confirm.component";
import {ModalInterface} from "../../shared/components/modals/modal-interface";
import {ModalInputComponent} from "../../shared/components/modals/modal-input/modal-input.component";

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

  constructor(
    public db: AngularFireDatabase,
    public userService: UserService,
    public matSnackBar: MatSnackBar,
    public modalService: BsModalService
    ) {

  }

  ngOnInit(): void {
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
    });
    this.currentDate = new Date();
  }

  onAddQDay(user: User){
    let bsModalRef: ModalInterface = this.modalService.show(ModalInputComponent);
    bsModalRef.content.title = "Add Queue Days";
    bsModalRef.content.message = `Enter the amount you want to add for ${user.name}`
  }

  // Increment by one
  addQueueDay(user: User) {
    let pVal = prompt(`Enter the amount you want to add for ${user.name}`);
    // parseBody value
    let amount = parseFloat(pVal);
    if (!isNaN(amount)) {
      if (window.confirm(`${user.name} will have ${user.currentQDays} increased by ${amount} to ${user.currentQDays + amount}. \nClick okay to confirm`)) {
        let newAmount = user.currentQDays + amount;
        this.userService.updateQueueDays(user, newAmount).subscribe(r => {
          user.currentQDays = r;
          let selector = `#${user.iNumber}.css-checkbox`;
          $(selector).attr("checked", "checked"); //jquery to check the box
        }, err => {
          this.matSnackBar.open("Error occured: " + err.message, "Close");
        })
      }
    }
  }

  updateQueueDays(user) {
    let pVal = prompt(`Enter the amount you want to overwrite for ${user.name}`);
    // parseBody value
    let amount = parseFloat(pVal);
    if (!isNaN(amount)) {
      if (window.confirm(`${user.name} will have ${user.currentQDays} CHANGED TO ${amount}. \nClick okay to confirm`)) {
        this.userService.updateQueueDays(user, amount).subscribe(r => {
          user.currentQDays = r;
        }, err => {
          this.matSnackBar.open("Error occured: " + err.message, "Close");
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

  logIt(msg) {
    console.log(msg);
  }
}
