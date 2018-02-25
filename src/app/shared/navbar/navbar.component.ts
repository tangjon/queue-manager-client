import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  userName: string;
  constructor(public afAuth: AngularFireAuth, public loginService: LoginService) {
  }

  ngOnInit(): void {
    let cachedINumber = localStorage[this.loginService.cacheKey]  // look at cache    
    this.loginService.signIn(cachedINumber);
  }

  logout() {
    this.afAuth.auth.signOut();
    this.loginService.signOut();
  }


}
