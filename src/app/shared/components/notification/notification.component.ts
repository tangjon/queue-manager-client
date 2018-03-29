import {Component, OnInit} from '@angular/core';
import {Notification} from "../../model/notification";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notification_array: Notification[] = [];

  constructor() {
  }

  ngOnInit() {
    this.notification_array.push(this.getResetNotification());
  }

  getResetNotification(): Notification {
    let display = false;
    if (this.daysLeftInQuarter(new Date) <= 7) {
      display = true;
    }
    return new Notification(
      "System Info",
      `There are ${this.daysLeftInQuarter(new Date())} days left in the quarter. Manual reset required soon.`,
      display
    );
  }

  daysLeftInQuarter(d) {
    d = d || new Date();
    // d.setDate(d.getDate() + 43)
    const qEnd: any = new Date(d);
    qEnd.setMonth(qEnd.getMonth() + 3 - qEnd.getMonth() % 3, 0);
    return Math.floor((qEnd - d) / 8.64e7);
  }
}
