import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {LoginService} from '../../../core/login.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appShort = environment.appShort;
  isProd = environment.production;
  dEnvironmentMsg = 'DEVELOPMENT';
  qmdoclink = "https://queuemanagerdocumentation-p2000140239trial.dispatcher.hanatrial.ondemand.com/additional-documentation/introduction.html";

  constructor(public loginService: LoginService) {
  }

  ngOnInit(): void {
    const cachedINumber = localStorage[environment.KEY_CACHE_INUMBER];  // look at cache
    console.log(this.loginService.user);
    this.loginService.signIn(cachedINumber);

    setTimeout(()=>{
      console.log(this.loginService.user)

    }, 3000)
  }

  logout() {
    this.loginService.signOut();
  }


}
