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
    this.itemsRef = db.list('users');
    this.users = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    // Start with clear form
    this.inputiNumber = "";
    this.inputName = "";
  }
  // TODO Create user model
  addItem(fName: string, iNumber: string) {
    if (fName && iNumber) {
      this.newUser = new User(iNumber,fName, this.db.createPushId() ) 
      this.db.object('users/' + this.newUser.key).set(this.newUser)
      console.log(this.newUser)
    }
    // clear form
    this.inputName = "";
    this.inputiNumber = "";
  }
  updateItem(key: string, fName: string, iNumber: string, usage: number) {
    usage = +usage;
    this.itemsRef.update(key, {
      name: fName,
      iNumber: iNumber,
      usagePercent: usage
    });
  }
  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }
  deleteEverything() {
    this.itemsRef.remove();
  }

  getUserRoles(user : User){
    return this.userService.getUserRole(user);
  }

  getRoleList(user : User){
    return this.userService.getRoleList(user);
  }

  hasRole(user:User, role:string){
    return this.userService.hasRole(user,role)
  }

  logIt(msg){
    console.log(msg)
  }
  toggleRole(user:User,role:string){
    let bool = this.hasRole(user, role);
    console.log(bool);
    let ref =  this.db.object('users/' + user.key + '/role/' + role);
    ref.set(!bool);
  }

}
