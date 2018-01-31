import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-team-manager',
  templateUrl: './team-manager.component.html',
  styleUrls: ['./team-manager.component.css']
})
export class TeamManagerComponent {
  itemsRef: AngularFireList<any>;
  users: Observable<any[]>;
  constructor(public db: AngularFireDatabase) {
    this.itemsRef = db.list('users');
  }
  // TODO Create user model
  addItem(fName: string, iNumber: string) {
    this.itemsRef.push({
      name: fName,
      iNumber: iNumber
    });
  }
  updateItem(key: string, fName: string, iNumber: string) {
    this.itemsRef.update(key, {
      name: fName,
      iNumber: iNumber
    });
  }
  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }
  deleteEverything() {
    this.itemsRef.remove();
  }

}
