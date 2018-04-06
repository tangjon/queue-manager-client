import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-notice-board-setting',
  templateUrl: './notice-board-setting.component.html',
  styleUrls: ['./notice-board-setting.component.css']
})
export class NoticeBoardSettingComponent implements OnInit {

  noticeBoardMsg$: AngularFireObject<any>;
  noticeBoardMsg;
  noticeBoardFlag;

  constructor(public db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.db.object(environment.firebaseRootUrl + '/notice-board').valueChanges().subscribe((r:any) => {
      this.noticeBoardFlag = r.flag;
      this.noticeBoardMsg = r.msg;
    })
  }


  onSubmit(f: NgForm) {
    if (f.valid) {
      const msg = f.value.message || "";
      const flag = f.value.flag || false;
      this.db.object(environment.firebaseRootUrl + '/notice-board/msg').set(msg);
      this.db.object(environment.firebaseRootUrl + '/notice-board/flag').set(flag);
    }
  }
}
