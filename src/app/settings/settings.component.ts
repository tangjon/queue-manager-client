import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {IncidentSetService} from '../core/incident-book-set.service';
import {UserService} from '../core/user.service';
import {User} from '../model/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {


  constructor(public incidentSetService: IncidentSetService,
              public  userService: UserService,
              public  matSnackBar: MatSnackBar,
              public db: AngularFireDatabase) {
  }

  ngOnInit() {
  }


  overwriteIncidentCount(t: NgForm) {
    if (t.valid) {
      this.userService.getUser(t.value.iNumber).switchMap((user: User) => {
        return this.incidentSetService.updateIncidentSet(user, t.value.type, t.value.amount);
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
