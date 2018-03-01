import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {LoginService} from '../../services/login.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appVersion = environment.appVersion;
  isProd = environment.production;
  dEnvironmentMsg = 'DEVELOPMENT';
  userName: string;
  constructor(public afAuth: AngularFireAuth, public loginService: LoginService) {
  }

  ngOnInit(): void {
    const cachedINumber = localStorage[this.loginService.cacheKey];  // look at cache
    this.loginService.signIn(cachedINumber);
  }

  logout() {
    this.afAuth.auth.signOut();
    this.loginService.signOut();
  }


}
