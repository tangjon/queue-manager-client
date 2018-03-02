import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/user.service';
import {User} from '../../model/user';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-qm-info',
  templateUrl: './qm-info.component.html',
  styleUrls: ['./qm-info.component.css']
})
export class QmInfoComponent implements OnInit {

  qmUser: Observable<User>;
  constructor(public userService: UserService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.qmUser = this.userService.getQM();
  }

  changeQM() {
    let uInput = prompt("Enter the iNumber of QM");
    this.userService.setQM(uInput).subscribe(t => {
        this.qmUser = this.userService.getQM();
      this.snackBar.open("Welcome Queue Manager","Close",{ duration: 1000 })
    },
      err => {
        alert(`'${uInput}' : User not found. Double check the iNumber`);
      })
  }
}
