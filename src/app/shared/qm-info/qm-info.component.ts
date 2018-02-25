import { Component, OnInit } from '@angular/core';
import { ActivityBookService } from '../../services/activity-book.service';
import { QmUser } from '../../model/qmuser';
import { ActivityBook } from '../../model/activitybook';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-qm-info',
  templateUrl: './qm-info.component.html',
  styleUrls: ['./qm-info.component.css']
})
export class QmInfoComponent implements OnInit {

  qmUser: QmUser;
  constructor(public activityBookService: ActivityBookService, public userService: UserService) { }

  ngOnInit() {
    this.activityBookService.getQM().subscribe((qm: QmUser) => {
      this.qmUser = qm;
      this.userService.getUser(qm.getINumber()).subscribe((user: User) => {
        this.qmUser.setName(user.name);
      },
        err => {
          console.log(err)
        })
    })
  }

  changeQM() {
    let arg = window.prompt("You are changing the QM. What is your INumber?", this.qmUser.getINumber());
    if (arg) {
      this.activityBookService.updateManager(new QmUser(arg)).subscribe(r => {
        this.userService.getUser(arg).subscribe((user: User) => {
          // if (data.length) {
          //   this.qmUser.setINumber(arg);
          //   this.qmUser.setName(data[0].name);
          // } else {
          //   window.confirm("Not a valid iNumber");
          // }
        })
      })
    }
  }
}
