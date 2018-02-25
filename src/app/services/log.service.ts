import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EntryLog } from '../model/entrylog';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class LogService {
  private api = "https://qmdatabasep2000140239trial.hanatrial.ondemand.com/hana_hello/data.xsodata/activity_log";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  private logSource = new BehaviorSubject<EntryLog[]>(new Array<EntryLog>());
  currentLog = this.logSource.asObservable();
  activityLog$: Array<EntryLog>;


  constructor(public http: HttpClient, public db: AngularFireDatabase) {
    this.activityLog$ = new Array<EntryLog>();
    this.getLogs().subscribe(logs => {
      console.log(this.activityLog$)
      this.activityLog$ = logs;
    })
  }

  private getLogs(): Observable<any> {
    return this.http.get(this.api, this.httpOptions).map((r: any) => {
      this.activityLog$ = [];
      let t = r.d.results.map(t => {
        let tmp = new EntryLog(t.NAME, t.INUMBER, t.ACTION, t.DESCRIPTION, t.MANAGER, t.PUSH_ID)
        tmp.setDateFromString(t.DATE)
        return tmp;
      })
      t.forEach((el: EntryLog) => {
        this.activityLog$.push(el);
      });
      return this.activityLog$;
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

  getAssignmentCount(user) {
    let logs = this.activityLog$;
    let today = new Date();
    let filterlog = logs.filter((el: EntryLog) => {
      return el.iNumber == user.iNumber &&
        el.action.indexOf("Incident") !== -1 &&
        dateInRange(el.getFullDate(), yesterdayDate(today), today);
    })
    if (filterlog.length) {
      let numAssigned = 0;
      let numRemoved = 0;
      filterlog.forEach((el: EntryLog) => {
        if (el.action.indexOf("Assigned") !== -1) {
          numAssigned++;
        } else if (el.action.indexOf("Removed")) {
          numRemoved++;
        }
      });
      // console.log(filterlog)
      return numAssigned - numRemoved;
    }
    return 0;

    function dateInRange(arg: Date, start: Date, end: Date) {
      if (arg.getTime() >= start.getTime() && arg.getTime() <= end.getTime()) {
        return true;
      } else {
        return false;
      }
    }
    function yesterdayDate(date: Date): Date {
      var yesterday = new Date(date.getTime() - (24 * 60 * 60 * 1000));
      return yesterday;
    }
  }
}
