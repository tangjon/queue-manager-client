import {Component} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {LoginService} from "./core/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Observable<any[]>;
  errorMessage: string;
  INITIALIZED = false;


  constructor(public afAuth: AngularFireAuth, public loginService: LoginService) {
  }
}
