import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public afAuth: AngularFireAuth) {
  }
  login(username:string, password:string) {
    console.log(username, password)
    this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(username,password);
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
