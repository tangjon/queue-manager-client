import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {User} from '../shared/model/user';

@Injectable()
export class LoginService {
  // noinspection SpellCheckingInspection
  cacheKey = "MYINUMBER";
  user: User;
  private loginMessage = "Please enter your I Number so Queue Manager Tool knows who you are.\n i.e i1234 with lower case 'i'";
  constructor(public userService: UserService) {

  }

  signIn(iNumber) {
    if (!iNumber) {
      iNumber = "empty"
    } else {
      iNumber = iNumber.toLowerCase();
    }
    this.userService.getUser(iNumber).subscribe((user: User) => {
      this.user = user;
      localStorage[this.cacheKey] = this.user.iNumber;
    },
      (err: Error) => {
        if (err.message == "User Not Found" && iNumber != "admin") {
          let p = prompt(this.loginMessage + '\n');
          this.signIn(p);
        }
      }
    )
  }
  signOut() {
    localStorage[this.cacheKey] = "";
  }
}
