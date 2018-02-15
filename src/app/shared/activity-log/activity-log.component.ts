import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { EntryLog } from '../../model/entrylog';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {

  constructor(public userService: UserService) {
   }
  activityLog: Array<EntryLog>;
  ngOnInit() {

    this.activityLog = this.userService.getActivityLog();
    this.activityLog.push(new EntryLog("test","test","test"))
    console.log(this.activityLog);
  }

}
