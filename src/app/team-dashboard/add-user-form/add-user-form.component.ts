import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {User} from "../../shared/model/user";
import {UserService} from "../../core/user.service";

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css']
})
export class AddUserFormComponent implements OnInit {

  constructor(public userService: UserService) {
  }

  ngOnInit() {
  }

  onAddUser(f: NgForm) {
    // Check valid and inputs exist
    if (f.valid && f.value.name && f.value.affectedInumber) {
      this.userService.addUser(f.value.name, f.value.affectedInumber).subscribe((user: User) => {
        // this.userList.push(user);
      })
    }
  }

}
