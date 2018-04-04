import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.css']
})
export class NoticeBoardComponent implements OnInit {
  notice$;
  message;
  flag;
  constructor(public db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.notice$ = this.db.object(environment.firebaseRootUrl+ '/notice-board');
    this.notice$.valueChanges().subscribe(resp => {
      this.message = resp.msg;
      this.flag = resp.flag || false;
    });
  }

}
