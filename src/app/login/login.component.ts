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
    // attempt to authenticate user
    if (this.loginService.getCachedToken()){
      this.loginService.authenticatedWithBasicToken().subscribe(() => {
      }, err => this.handleError(err));
    }
  }

  login(username: string, password: string) {
    this.loginService.authenticateWithFirebase(username, password).catch(
      e => this.handleError(e)
    );
    this.loginService.authenticateWithUserNamePassword(username, password)
      .subscribe(
        () => console.log("Login Successful"),
        err => this.handleError(err)
      );
  }

  logout() {
    this.loginService.signOut();
  }

  handleError(err) {
    console.log("hello");
    this.authFlag = false;
    this.authMessage = err.message;
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      let data = f.value;
      let username = data.inputUsername;
      let password = data.inputPassword;
      this.login(username, password);
    }
  }
}

