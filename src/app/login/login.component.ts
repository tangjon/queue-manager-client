import {Component} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {NgForm} from "@angular/forms";
import {LoginService} from "../core/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authFlag = true;
  authMessage = "";

  constructor(public afAuth: AngularFireAuth, public loginService: LoginService) {
  }
  login(username: string, password: string) {
    this.loginService.authenticateWithFirebase(username, password).catch(
      e => this.handleError(e)
    )

  }
  logout() {
    this.loginService.signOut()
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
      this.login(userName, password)
    }
  }
}

