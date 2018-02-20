import { Component, OnInit } from '@angular/core';
import { ActivityBookService } from '../../services/activity-book.service';
import { QmUser } from '../../model/qmuser';

@Component({
  selector: 'app-qm-info',
  templateUrl: './qm-info.component.html',
  styleUrls: ['./qm-info.component.css']
})
export class QmInfoComponent implements OnInit {

  qmUser : QmUser
  constructor(public activityBookService: ActivityBookService) { }

  ngOnInit() {
    this.qmUser = this.activityBookService.getManager();
  }

  changeQM() {
    let arg = window.prompt("You are changing the QM. What is your name?", this.qmUser.getName());
    if (arg) {
      this.qmUser.setName(arg);
      this.activityBookService.updateManager(arg);
    }
  }
}
