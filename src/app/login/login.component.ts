import {Component} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authFlag = true;
  authMessage = "";

  constructor(public afAuth: AngularFireAuth) {
  }
  login(username: string, password: string) {
    // Todo this is work around
    username += "@scout33.org";
    this.afAuth.auth.signInWithEmailAndPassword(username, password)
      .catch(err => this.handleError(err));

  }
  logout() {
    this.afAuth.auth.signOut();
  }

  handleError(err) {
    this.authFlag = false;
    this.authMessage = err.code;
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      let data = f.value;
      let userName = data.inputUsername;
      let password = data.inputPassword;
      userName += "@scout33.org";
      this.afAuth.auth.signInWithEmailAndPassword(userName, password)
        .catch(err => this.handleError(err));
    }
  }
}

