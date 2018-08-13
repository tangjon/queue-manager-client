import {Injectable} from "@angular/core";
import {WebSocketAbstractService} from "./websocketAbstract.service";
import {Subject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications: Subject<any>;
  private key = "notifications";

  constructor(webSocketAbstractService: WebSocketAbstractService){
    this.notifications = webSocketAbstractService
      .connect(this.key)
  }

  sendMsg(msg) {
    this.notifications.next(msg);
  }
}
