import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';
import { parse } from 'url';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-rcc-management',
  templateUrl: './rcc-management.component.html',
  styleUrls: ['./rcc-management.component.css']
})
export class RccManagementComponent {
  selectedUser: any;
  users: Observable<any[]>;
  constructor(public db: AngularFireDatabase, public userSerivice: UserService) {
    this.users = userSerivice.getUsers({
      child: "name"
    });
  }

  selectUser(user) {
    this.selectedUser = user;
    console.log(user)
  }

  // Increment by one
  addQueueDay(val) {
    if (this.selectedUser) {
      let amount = parseInt(val);
      this.userSerivice.updateQueueDays(this.selectedUser.key, this.selectedUser.currentQDays + amount);
      this.clearSelectedUser();
    }
  }

  updateQueueDays(val) {
    if (this.selectedUser) {
      let amount = parseInt(val);
      this.userSerivice.updateQueueDays(this.selectedUser.key, amount);
      this.clearSelectedUser();
    }
  }

  clearSelectedUser() {
    this.selectedUser = "";
  }

}
