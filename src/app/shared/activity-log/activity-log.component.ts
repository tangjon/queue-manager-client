import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { EntryLog } from '../../model/entrylog';
import { ActivityBook } from '../../model/activitybook';
import { LogService } from '../../services/log.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  private activityLog: Array<EntryLog>;
  private showSpinner: boolean = true;
  private activityLog$: Observable<any>;

  constructor(public userService: UserService, public logService: LogService) {
  }

  ngOnInit() {
    this.activityLog$ = this.logService.getLogs();
    this.activityLog$.subscribe(r => {
      this.showSpinner = false;
    })
  }


}
