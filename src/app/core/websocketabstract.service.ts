import {Injectable} from '@angular/core';
import io from 'socket.io-client';
import {Observable, Subject} from 'rxjs';
import {environment} from "../../environments/environment";


// TERRIBLE NEEDS REFACTORING
// OPERATING AS PROOF OF CONCEPT
@Injectable({
  providedIn: 'root'
})
export class WebSocketAbstractService {

  // Our socket connection
  socket;


  constructor() {
    this.socket = io.connect(environment.ws_url);
  }

  connect(key: string): Subject<any> {
    // If you aren't familiar with environment variables then
    // you can hard code `environment.ws_url` as `http://localhost:5000`
    // this.socket = io.connect(environment.ws_url);

    this.socket.on("connect", () => {
    });
    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    let observable = new Observable(observer => {
      this.socket.on(key, (data) => {
        // console.log("Received message from Websocket Server");
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    let observer = {
      next: (data: Object) => {
        this.socket.emit(key, JSON.stringify(data));
      },
    };
    // we return our Subject which is a combination
    // of both an observer and observable.
    return Subject.create(observer, observable);
  }
}
