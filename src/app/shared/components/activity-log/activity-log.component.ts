import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../core/user.service';
import {EntryLog} from '../../model/entrylog';
import {LogService} from '../../../core/log.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  showSpinner = true;
  activityLog$: Observable<any>;
  numOfResults = 50;

  constructor(public userService: UserService, public logService: LogService) {
  }

  ngOnInit() {
    this.activityLog$ = this.logService.getLogsAsSource().map((log: EntryLog[]) => {
      return log.slice(0, this.numOfResults);
    });
    this.activityLog$.subscribe((logs: EntryLog[]) => {
      this.showSpinner = false;
    });
  }


}
