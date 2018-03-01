import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {EntryLog} from '../../model/entrylog';
import {LogService} from '../../services/log.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  showSpinner = true;
  activityLog$: Observable<any>;
  constructor(public userService: UserService, public logService: LogService) {
  }

  ngOnInit() {
    this.activityLog$ = this.logService.getLogs();
    this.activityLog$.subscribe((logs: EntryLog[]) => {
      this.showSpinner = false;
    });
  }


}
