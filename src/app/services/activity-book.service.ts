import { Injectable } from '@angular/core';
import { ActivityBook } from '../model/activitybook';
import { EntryLog } from '../model/entrylog';
import { User } from '../model/user';
import { Role } from '../model/role';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { QmUser } from '../model/qmuser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class ActivityBookService {

  private activityBook: ActivityBook;
  ACTIVITY_LOG_URL: string = "https://qmdatabasep2000140239trial.hanatrial.ondemand.com/hana_hello/data.xsodata/activity_log";
  QM_URL: string = "https://qmdatabasep2000140239trial.hanatrial.ondemand.com/hana_hello/data.xsodata/qm('current')";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(public db: AngularFireDatabase, public http: HttpClient) {
    this.activityBook = new ActivityBook();
    this.getBook().subscribe((book: ActivityBook) => {
      this.activityBook = book
    })
  }
  getBook(): Observable<ActivityBook> {
    return Observable.forkJoin([
      this.getQM()
    ])
      .map((data: any[]) => {
        const [QM] = data;
        let book = new ActivityBook();
  

        // Set QM
        book.setActiveQM(QM);
        this.activityBook = book;
        return book;
      });
  }

  getQM(): Observable<QmUser> {
    return this.http.get(this.QM_URL, this.httpOptions)
      .map((r: any) => {
        return new QmUser(r.d.INUMBER);
      })
  }

  updateManager(qm: QmUser) {
    let body = {
      "INUMBER": qm.getINumber()
    }
    this.activityBook.setActiveQM(qm);
    return this.http.put(this.QM_URL, body, this.httpOptions)
  }

  resetLogs() {
    let logRef = this.activityBook.getLogs();
    logRef.forEach((el: EntryLog) => {
      this.http.delete(gDeleteUrl(el.pushID)).subscribe(r => {
        this.activityBook.removeEntry(el.pushID);
      })
    });

    function gDeleteUrl(key) {
      let url: string = "https://qmdatabasep2000140239trial.hanatrial.ondemand.com/hana_hello/data.xsodata/activity_log"
      return url + "('" + key + "')";
    }
  }

  getAssignmentCount(user) {
    let logs = this.activityBook.getLogs();
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

  getCachedINumber() {
    return localStorage["MYINUMBER"];
  }
}
