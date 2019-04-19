import {Injectable} from "@angular/core";
import {WebSocketAbstractService} from "./websocketAbstract.service";
import {Subject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class QueueStateService {

  state: Subject<any>;
  private key = "queue modified";

  constructor(public webSocketAbstractService: WebSocketAbstractService) {
    this.state = webSocketAbstractService
      .connect(this.key);
  }

  modifyQueue() {
    this.state.next({
      "socket_id": this.webSocketAbstractService.socket.id
    });
  }
}
