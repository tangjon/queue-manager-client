import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/user.service';
import {User} from '../../shared/model/user';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AngularFireDatabase} from "angularfire2/database";

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
    let uInput = prompt("Enter the iNumber of QM").replace(/\s/g, '');
    if (uInput && uInput.length) {
      this.userService.setQM(uInput.toLowerCase()).subscribe(() => {
          this.qmUser = this.userService.getQM();
          this.snackBar.open("Welcome Queue Manager", "Close", {duration: 1000});
        },
        e => {
          alert(e.message);
        });
    }

  }
}
