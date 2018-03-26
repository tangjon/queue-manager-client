import {Component} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Observable<any[]>;
  errorMessage: string;

  constructor(db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    // window.onscroll = this.testScroll;
  }

  // testScroll(ev) {
  //   console.log(window.pageYOffset);
  //   if (window.pageYOffset > 200) { console.log('User has scrolled at least 400 px!'); }
  // }
}
