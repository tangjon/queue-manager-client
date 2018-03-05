import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";

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
  }


  onSubmit(f: NgForm) {
    if (f.valid) {
      const msg = f.value.message || "";
      const flag = f.value.flag || false;
      this.db.object('notice-board/msg').set(msg);
      this.db.object('notice-board/flag').set(flag);
    }
  }
}
