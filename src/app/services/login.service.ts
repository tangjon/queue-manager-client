import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../model/user';

@Injectable()
export class LoginService {
  cacheKey = "MYINUMBER"
  user: User;
  private loginMessage = "Please enter your I Number so Queue Manager Tool knows who you are.\n i.e i1234 with lower case 'i'"
  constructor(public userService: UserService) {

  }

  signIn(iNumber) {
    this.userService.getUser(iNumber).subscribe((user: User) => {
      this.user = user;
      localStorage[this.cacheKey] = this.user.iNumber;
    },
      (err: Error) => {
        if (err.message != "Http failure response for (unknown url): 0 Unknown Error") {
          let p = prompt(this.loginMessage);
          console.log(err)
          this.signIn(p);
        }

      }
    )
  }
  signOut() {
    localStorage[this.cacheKey] = "";
  }
}
