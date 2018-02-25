import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { EntryLog } from '../../model/entrylog';
import { ActivityBook } from '../../model/activitybook';
import { ActivityBookService } from '../../services/activity-book.service';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  private activityLog: Array<EntryLog>;
  private showSpinner: boolean = true;

  constructor(public userService: UserService, public activityBookSerivce: ActivityBookService, public logService:LogService) {
    this.activityLog = logService.activityLog$;
    this.showSpinner = false;
  }

  ngOnInit() {
    // Fixes timing issue when displaying logs in realtime
    // setTimeout(() => {
    //   // this.activityBookSerivce.getBook()
    //   this.activityBookSerivce.getBook().subscribe((book: ActivityBook) => {
    //     this.activityLog = book.getLogs();
    //     this.showSpinner = false;
    //   })
    // }, 2000)
  }

  reSync() {
    this.showSpinner = true;
    this.activityBookSerivce.getBook().subscribe((book: ActivityBook) => {
      this.activityLog = book.getLogs();
      this.showSpinner = false;
    })
  }


}
