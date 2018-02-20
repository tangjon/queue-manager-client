import { Injectable } from '@angular/core';
import { ActivityBook } from '../model/activitybook';
import { EntryLog } from '../model/entrylog';
import { User } from '../model/user';
import { Role } from '../model/role';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { QmUser } from '../model/qmuser';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ActivityBookService {

  private activityBook: ActivityBook;
  url: string = "https://qmdatabasep2000140239trial.hanatrial.ondemand.com/hana_hello/data.xsodata/activity_log"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  constructor(public db: AngularFireDatabase, public http: HttpClient) {
    this.activityBook = new ActivityBook();
    http.get("https://qmdatabasep2000140239trial.hanatrial.ondemand.com/hana_hello/data.xsodata/qm('current')", this.httpOptions)
      .map((r: any) => {
        return new QmUser(r.d.INUMBER);
      }).
      subscribe((t: QmUser) => {
        console.log(t);
        this.activityBook.setActiveQM(t);
      });
  }

  getBook(): Observable<ActivityBook> {
    this.activityBook.clearEntries();
    return this.http.get(this.url + "?$format=json", this.httpOptions)
      .map((r: any) => {
        let t = r.d.results.map(t => {
          let tmp = new EntryLog(t.NAME, t.INUMBER, t.ACTION, t.DESCRIPTION, new QmUser(t.MANAGER), t.PUSH_ID)
          tmp.setDateFromString(t.DATE)
          return tmp;
        })
        t.forEach((el: EntryLog) => {
          this.activityBook.addEntry(el);
        });
        return this.activityBook;
      });
  }

  getManager(): Observable<QmUser> {
    return this.http.get("https://qmdatabasep2000140239trial.hanatrial.ondemand.com/hana_hello/data.xsodata/qm('current')", this.httpOptions)
      .map((r: any) => {
        return new QmUser(r.d.INUMBER);
      })
  }

  updateManager(qm: QmUser) {
    let body = {
      "INUMBER": qm.getINumber()
    }
    console.log(qm);
    this.activityBook.setActiveQM(qm);

    console.log(this.activityBook.getActiveQM())
    return this.http.put("https://qmdatabasep2000140239trial.hanatrial.ondemand.com/hana_hello/data.xsodata/qm('current')", body, this.httpOptions)
  }

  logIncident(user: User, type: string, amount: number) {
    let aString = "";
    if (amount >= 0) {
      aString = "Incident Assigned"
    } else {
      aString = "Incident Unassigned"
    }
    this.logEntry(user,
      aString,
      user.getIncidentAmount(type) + " to " + (user.getIncidentAmount(type) + amount) + " in " + type);
  }

  logRole(user: User, role) {
    let action = "";
    if (user.hasRole(role)) {
      action = "Unassigned"

    } else {
      action = "Assigned"
    }
    this.logEntry(user, "Role Changed", action + " " + role)
  }

  logUser(user) {
    this.logEntry(user, "User Updated", user.name + "'s credential have been updated")
  }

  logEntry(user, action, description) {
    let pushId = this.db.createPushId();
    let entry = new EntryLog(
      user.name, user.iNumber,
      action, description, this.activityBook.getActiveQM(),
      pushId
    );
    console.log(this.activityBook.getActiveQM());
    let body = {
      "PUSH_ID": pushId,
      "ACTION": action,
      "MANAGER": entry.getManager().getINumber(),
      "DATE": JSON.stringify(entry.getFullDate()),
      "DESCRIPTION": description,
      "NAME": user.name,
      "INUMBER": user.iNumber
    }
    this.http.post(this.url, body, this.httpOptions)
      .subscribe(t => {
        this.activityBook.addEntry(entry);
      });
  }

  resetLogs() {
    let logRef = this.activityBook.getLogs();
    logRef.forEach((el: EntryLog) => {
      this.http.delete(gDeleteUrl(el.pushID)).subscribe(r => {
        this.activityBook.removeEntry(el.pushID);
        console.log("Deleting", el.pushID)
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
}
