import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EntryLog } from '../model/entrylog';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class LogService {
  private api = "https://qmdatabasep2000140239trial.hanatrial.ondemand.com/hana_hello/data.xsodata/activity_log";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  activityLog$: Array<EntryLog>;
  constructor(public http: HttpClient, public db: AngularFireDatabase) {
    this.activityLog$ = new Array<EntryLog>();
    this.getLogs();
  }

  getLogs() {
    this.http.get(this.api, this.httpOptions)
      .subscribe((r: any) => {
        let t = r.d.results.map(t => {
          let tmp = new EntryLog(t.NAME, t.INUMBER, t.ACTION, t.DESCRIPTION, t.MANAGER, t.PUSH_ID)
          tmp.setDateFromString(t.DATE)
          return tmp;
        })
        t.forEach((el: EntryLog) => {
          this.activityLog$.push(el);
        });
      })
  }

  addLog(user, action, description) {
    let pushId = this.db.createPushId();
    let entry = new EntryLog(
      user.name, user.iNumber,
      action, description, this.getCachedINumber(),
      pushId
    );
    let body = {
      "PUSH_ID": pushId,
      "ACTION": action,
      "MANAGER": this.getCachedINumber(),
      "DATE": JSON.stringify(entry.getFullDate()),
      "DESCRIPTION": description,
      "NAME": user.name,
      "INUMBER": user.iNumber
    }
    this.http.post(this.api, body, this.httpOptions)
      .subscribe(t => {
        this.activityLog$.push(entry);
      });
  }

  purgeLogs() {
    this.activityLog$.forEach((el: EntryLog) => {
      let url = `${this.api}('${el.pushID}')`;
      console.log(url)
      this.http.delete(url).subscribe(r => {
        let index = this.activityLog$.findIndex((log: EntryLog) => {
          return log.pushID == el.pushID;
        })
        this.activityLog$.splice(index, 1)
      })

    });
  }

  getCachedINumber() {
    return localStorage["MYINUMBER"];
  }

}
