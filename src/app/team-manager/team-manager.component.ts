import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-team-manager',
  templateUrl: './team-manager.component.html',
  styleUrls: ['./team-manager.component.css']
})
export class TeamManagerComponent {
  newUser: User;
  inputName: string;
  inputiNumber: string;

  itemsRef: AngularFireList<any>;
  users: Observable<any[]>;
  constructor(public db: AngularFireDatabase, public userService: UserService) {
    // Get Users
    this.users = userService.getUsers({});
    // Start with clear form
    this.inputiNumber = "";
    this.inputName = "";
  }

  // TODO Create user model
  addUser(fName: string, iNumber: string) {

    this.userService.addUser(fName, iNumber);
  }
  updateItem(key: string, fName: string, iNumber: string, usage: number) {
    this.userService.updateUser(key,fName, iNumber,usage);
  }
  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }
  deleteEverything() {
    this.userService.deleteEverything();
  }
  logIt(msg) {
    console.log(msg)
  }
  toggleRole(user: User, role: string) {
    this.userService.toggleRole(user,role);
  }

}
