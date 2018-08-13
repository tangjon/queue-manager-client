import {Component, OnInit} from '@angular/core';
import {Notification} from "../../model/notification";
import {NotificationService} from "../../../core/notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notification_array: Notification[] = [];

  constructor(public notificationService: NotificationService) {
  }

  ngOnInit() {
    this.notificationService.notifications.subscribe(res=>{
      console.log(res);
      this.notification_array.push(new Notification("System Info",res.message,true))
    });
  }
}
