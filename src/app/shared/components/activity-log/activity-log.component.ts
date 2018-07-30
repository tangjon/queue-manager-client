import {Component, OnInit} from '@angular/core';
import {LogService} from '../../../core/log.service';
import {Observable} from 'rxjs/Observable';
import {ActionEntryLog} from "../../model/actionEntryLog";

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  /* General Variables */
  showSpinner = false;
  NUM_OF_RESULTS = 50;
  activityLog$: Observable<any>;

  actionActiveLogList: Array<ActionEntryLog> = [];

  constructor(public logService: LogService) {
  }

  ngOnInit() {
    this.activityLog$ = Observable.of([]);

    this.logService.getLogs().map(arr => arr.slice(0, this.NUM_OF_RESULTS)).subscribe((res: any) => {
      this.actionActiveLogList = res;
    })
  }
}
