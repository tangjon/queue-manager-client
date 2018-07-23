import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/user.service';
import {User} from '../../shared/model/user';
import {Observable} from 'rxjs/Observable';
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
    let uInput = prompt("Enter the iNumber of QM");
    console.log("hello")

    if (uInput && uInput.length) {
      this.userService.setQM(uInput.toLowerCase()).subscribe(() => {
          console.log("hello")


          this.qmUser = this.userService.getQM();
          this.snackBar.open("Welcome Queue Manager", "Close", {duration: 1000})
        },
        err => {
          console.log("hello")

          alert(err.message);
        })
    }

  }
}
