import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {IncidentSetService} from '../../services/incident-set.service';
import {UserService} from '../../services/user.service';
import {User} from '../../model/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  noticeBoardMsg$: AngularFireObject<any>;
  noticeBoardMsg;

  constructor(public incidentSetService: IncidentSetService,
              public  userService: UserService,
              public  matSnackBar: MatSnackBar,
              public db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.noticeBoardMsg$ = this.db.object('notice-board');
    this.noticeBoardMsg$.valueChanges().subscribe(resp => {
      this.noticeBoardMsg = resp.msg;
      console.log(resp);
    });
  }

  onSubmit(f: NgForm) {
    const msg = f.value.message;
    this.db.object('notice-board/msg').set(msg);
  }

  overwriteIncidentCount(t: NgForm) {
    if (t.valid) {
      this.userService.getUser(t.value.iNumber).switchMap((user: User) => {
        return this.incidentSetService.updateIncidentSet(user, t.value.type, t.value.amount);
      }).subscribe(() => {
          this.matSnackBar.open('Success', 'Close', {duration: 1000});
        },
        error => {
          console.log('ERROR!');
        }
      );
    }
  }
}
