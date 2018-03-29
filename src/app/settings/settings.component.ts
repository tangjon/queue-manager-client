import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../core/user.service';
import {User} from '../shared/model/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AngularFireDatabase} from 'angularfire2/database';
import {IncidentBookService} from "../core/incident-book.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {


  constructor(public incidentBookService: IncidentBookService,
              public  userService: UserService,
              public  matSnackBar: MatSnackBar,
              public db: AngularFireDatabase) {
  }

  ngOnInit() {
  }


  overwriteIncidentCount(t: NgForm) {
    if (t.valid) {
      this.userService.getUser(t.value.iNumber).switchMap((user: User) => {
        return this.incidentBookService.set(user.key, t.value.type, t.value.amount);
      }).subscribe(() => {
          this.matSnackBar.open('Success', 'Close', {duration: 1000});
        },
        error => {
          this.matSnackBar.open('Error Occured', 'Close', {duration: 1000});
        }
      );
    }
  }
}
