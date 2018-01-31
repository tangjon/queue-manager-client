import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-team-manager',
  templateUrl: './team-manager.component.html',
  styleUrls: ['./team-manager.component.css']
})
export class TeamManagerComponent {
  inputName: string;
  inputiNumber: string;

  itemsRef: AngularFireList<any>;
  users: Observable<any[]>;
  constructor(public db: AngularFireDatabase) {
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
      this.itemsRef.push({
        name: fName,
        iNumber: iNumber
      });
    }
    // clear form
    this.inputName = "";
    this.inputiNumber = "";
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
