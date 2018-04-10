import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {User} from '../shared/model/user';
import {ErrorObservable} from "rxjs/observable/ErrorObservable";

@Injectable()
export class LoginService {
  // noinspection SpellCheckingInspection
  CACHE_KEY = "MYINUMBER";
  user: User;
  private loginMessage = "Please enter your I Number so Queue Manager Tool knows who you are.\n i.e i1234 with lower case 'i'";

  constructor(public userService: UserService, ) {
  }

  signIn(iNumber) {
    if (!iNumber) {
      iNumber = "empty"
    }
    this.userService.getUserByNumber(iNumber.toLowerCase()).subscribe((user: User) => {
        this.user = user;
        localStorage[this.CACHE_KEY] = this.user.iNumber;
      },
      (err: ErrorObservable) => {
        if (err.error === this.userService.USER_NOT_FOUND && iNumber != "admin") {
          let p = prompt(this.loginMessage + '\n');
          this.signIn(p);
        }
      }
    )
  }

  signOut() {
    localStorage[this.CACHE_KEY] = "";
  }

  getUser() {
    return this.user;
  }
}
