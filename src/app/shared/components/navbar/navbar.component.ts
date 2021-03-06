import {Component, OnInit} from '@angular/core';
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
  qmdoclink = environment.doc_url;

  constructor(public loginService: LoginService) {
  }

  ngOnInit(): void {
    if (!environment.enableDemo) {
      const cachedINumber = localStorage[environment.KEY_CACHE_INUMBER];  // look at cache
      this.loginService.logonWithINumber(cachedINumber);
    }

  }

  logout() {
    this.loginService.signOut();
  }


}
