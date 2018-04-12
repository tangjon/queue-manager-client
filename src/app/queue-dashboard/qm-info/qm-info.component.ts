import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/user.service';
import {User} from '../../shared/model/user';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AngularFireDatabase} from "angularfire2/database";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-qm-info',
  templateUrl: './qm-info.component.html',
  styleUrls: ['./qm-info.component.css']
})
export class QmInfoComponent implements OnInit {

  qmUser: Observable<User>;

  constructor(public userService: UserService, public snackBar: MatSnackBar, private db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.qmUser = this.userService.getQM();
  }

  changeQM() {
    let uInput = prompt("Enter the iNumber of QM");
    if (uInput && uInput.length) {
      this.userService.setQM(uInput.toLowerCase()).subscribe(() => {
          // Change Cached I Number && Populate #qmUser for display
          // this.db.object(environment.firebaseRootUrl + '/')
          // this.userService.logService.setCachedINumber(uInput.toLowerCase());
          this.qmUser = this.userService.getQM();
          this.snackBar.open("Welcome Queue Manager", "Close", {duration: 1000})
        },
        err => {
          alert(err);
        })
    }

  }
}
