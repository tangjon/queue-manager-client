import {Component, OnInit} from '@angular/core';
import {LogService} from '../../../core/log.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  /* General Variables */
  showSpinner = true;
  NUM_OF_RESULTS = 50;
  activityLog$: Observable<any>;

  constructor(public logService: LogService) {
  }

  ngOnInit() {
    this.activityLog$ = this.logService.getLogAsSubject(this.NUM_OF_RESULTS);
    this.activityLog$.subscribe(()=>this.showSpinner=false);
  }
}
