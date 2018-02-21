import { Component, OnInit } from '@angular/core';
import { ActivityBookService } from '../../services/activity-book.service';
import { QmUser } from '../../model/qmuser';
import { ActivityBook } from '../../model/activitybook';

@Component({
  selector: 'app-qm-info',
  templateUrl: './qm-info.component.html',
  styleUrls: ['./qm-info.component.css']
})
export class QmInfoComponent implements OnInit {

  qmUser: QmUser
  constructor(public activityBookService: ActivityBookService) { }

  ngOnInit() {
    this.activityBookService.getQM().subscribe((qm: QmUser) => {
      this.qmUser = qm;
    })
  }

  changeQM() {
    let arg = window.prompt("You are changing the QM. What is your INumber?", this.qmUser.getINumber());
    if (arg) {
      this.activityBookService.updateManager(new QmUser(arg)).subscribe(r => {
        this.qmUser.setINumber(arg);
      })
    }
  }
}
