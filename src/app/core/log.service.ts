import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EntryLog} from '../model/entrylog';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/forkJoin';
import {environment} from '../../environments/environment';
import {User} from "../model/user";


@Injectable()
export class LogService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  private api = environment.apiUrl + 'activity_log';
  private logSource = new BehaviorSubject<EntryLog[]>([]);
  private activityLog: Array<EntryLog>;
  activityLog$ = this.logSource.asObservable();

  constructor(public http: HttpClient, public db: AngularFireDatabase) {
    // this.activityLog = new Array<EntryLog>();
    // this.getLogs().subscribe(logs => {
    //   this.activityLog = logs;
    //   this.logSource.next(logs);
    // })
  }

  getLogs(): Observable<any> {
    return this.http.get(this.api, this.httpOptions).map((r: any) => {
      this.activityLog = [];
      const t = r.d.results.map((t: any) => {
        const tmp = new EntryLog(t.NAME, t.INUMBER, t.ACTION, t.DESCRIPTION, t.MANAGER, t.PUSH_ID);
        tmp.setDateFromString(t.DATE);
        return tmp;
      });
      t.forEach((el: EntryLog) => {
        this.activityLog.push(el);
      });
      this.activityLog.sort(function (a: any, b: any) {
        return b.date - a.date;
      });
      return this.activityLog;
    }).switchMap(r => {
      this.logSource.next(r);
      return this.logSource.asObservable();
    });
  }

  addLog(user, action, description) {
    const pushId = this.db.createPushId();
    const entry = new EntryLog(
      user.name, user.iNumber,
      action, description, this.getCachedINumber(),
      pushId
    );
    const body = {
      'PUSH_ID': pushId,
      'ACTION': action,
      'MANAGER': this.getCachedINumber(),
      'DATE': JSON.stringify(entry.getFullDate()),
      'DESCRIPTION': description,
      'NAME': user.name,
      'INUMBER': user.iNumber
    };
    this.http.post(this.api, body, this.httpOptions).subscribe(() => {
      this.activityLog.push(entry);
      this.activityLog.sort(function (a: any, b: any) {
        return b.date - a.date;
      });
      this.logSource.next(this.activityLog);
    });
  }

  purgeLogs() {
    const array = [];
    this.activityLog.forEach((el: EntryLog) => {
      const url = `${this.api}('${el.pushID}')`;
      array.push(this.http.delete(url));
    });

    return Observable.forkJoin(array).map(() => {
      this.activityLog.splice(0, this.activityLog.length);
      this.logSource.next(this.activityLog);
    })
    // this.activityLog.forEach((el: EntryLog) => {
    //   let url = `${this.api}('${el.pushID}')`;
    //   console.log(url)
    //   this.http.delete(url).subscribe(r => {
    //     let index = this.activityLog.findIndex((log: EntryLog) => {
    //       return log.pushID == el.pushID;
    //     })
    //     this.activityLog.splice(index, 1)
    //     this.logSource.next(this.activityLog);
    //   })
    // });
  }

  getCachedINumber() {
    return localStorage['MYINUMBER'];
  }

  getAssignmentCount(user: User) {
    // var url = this.api + "?$filter=INUMBER eq '" + user.iNumber + "'";
    const logs = this.activityLog;
    const filterlog = logs.filter((el: EntryLog) => {
      return el.iNumber === user.iNumber &&
        el.action.indexOf('Incident') !== -1 &&
        dateInRangeToday(el.getFullDate());
    });
    if (filterlog.length) {
      let numAssigned = 0;
      let numRemoved = 0;
      filterlog.forEach((el: EntryLog) => {
        if (el.action.indexOf('Assigned') !== -1) {
          numAssigned++;
        } else if (el.action.indexOf('Removed')) {
          numRemoved++;
        }
      });
      return numAssigned - numRemoved;
    }
    return 0;

    function dateInRange(arg: Date, start: Date, end: Date) {
      return arg.getTime() >= start.getTime() && arg.getTime() <= end.getTime();
    }

    function dateInRangeToday(arg: Date): boolean {
      const today = new Date();
      const tmp = new Date(arg);
      return tmp.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
    }

    function yesterdayDate(date: Date): Date {
      return new Date(date.getTime() - (24 * 60 * 60 * 1000));
    }
  }
}
