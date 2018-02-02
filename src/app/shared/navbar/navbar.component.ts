import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    // $(".nav-item").on("click", function () {
    //   $(".nav").find(".active").removeClass("active");
    //   $(this).parent().addClass("active");
    // });
  }
  userName: string;
  constructor(public afAuth: AngularFireAuth) {
  }
  logout() {
    this.afAuth.auth.signOut();
  }


}
