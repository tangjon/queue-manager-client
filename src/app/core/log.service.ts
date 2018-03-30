import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EntryLog} from '../shared/model/entrylog';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/forkJoin';
import {environment} from '../../environments/environment';
import {User} from "../shared/model/user";
import {Helper} from "../shared/helper/helper";

type Action =
  'Incident Assigned'
  | 'Incident Unassigned'
  | 'Availability Changed'
  | 'Queue Days Changed'
  | 'Support Changed'

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

  /* Restructure
  *  1. Subscribe to logSource
  *  2. Initialized with all logs
  *  3. Subsequent logs are passed individually
  * */

  /*
* [PARTIALLY REFACTORED] March 29th 2018
* */

  constructor(public http: HttpClient, public db: AngularFireDatabase) {
    // Make logs "real-time"
    this.db.object('log-last-change').valueChanges().subscribe(r => {
      this.getLogsAsSource().subscribe(() => {
      })
    });
  }

  getLogsAsSource(): Observable<any> {
    return this.getLogs().switchMap(r => {
      this.logSource.next(r);
      return this.logSource.asObservable();
    });
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
    })
  }


  addLog(user, action: Action, description) {
    console.log(action);
    const pushId = this.db.createPushId();
    const entry = new EntryLog(
      user.name, user.iNumber,
      action, description, this.getCachedINumber(),
      pushId
    );
    const body = this.generateBody(pushId, action, entry, description, user);
    this.http.post(this.api, body, this.httpOptions).subscribe(() => {
      this.activityLog.push(entry);
      this.activityLog.sort(function (a: any, b: any) {
        return b.date - a.date;
      });
      this.logSource.next(this.activityLog);
      this.db.object('log-last-change').set(new Date().getTime());
    });
  }

  purgeLogs(): Observable<any> {
    const $batch = [];
    this.activityLog.forEach((el: EntryLog) => {
      const url = `${this.api}('${el.KEY}')`;
      $batch.push(this.http.delete(url));
    });
    if ($batch.length == 0) {
      return Observable.of({});
    } else {
      return Observable.forkJoin($batch).map(() => {
        this.activityLog.splice(0, this.activityLog.length);
        this.logSource.next(this.activityLog);
      })
    }
  }

  private generateBody(pushId: string | null, action: Action, entry: EntryLog, description, user) {
    return {
      'PUSH_ID': pushId,
      'ACTION': action,
      'MANAGER': this.getCachedINumber(),
      'DATE': JSON.stringify(entry.getFullDate()),
      'DESCRIPTION': description,
      'NAME': user.name,
      'INUMBER': user.iNumber
    };
  }

  getCachedINumber() {
    return localStorage['MYINUMBER'];
  }

  getAssignmentCountv2(user: User, date_begin, date_end) {
    const logs = this.activityLog;
    const filterlog = logs.filter((el: EntryLog) => {
      return el.iNumber === user.iNumber &&
        el.action.indexOf('Incident') !== -1 && dateInRange(el.getFullDate(), date_begin, date_end);
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

    function dateInRange(arg: Date, start: Date, end: Date): boolean {
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

  static filterAction(logs:EntryLog[], action:Action,) {
    return logs.filter((log:EntryLog)=> log.action === action);
  }

  static filterDate(logs:EntryLog[], date: Date, dateStart: Date, dateEnd:Date){
    // return logs.filter((log:EntryLog)=> Helper.dateInRange(date,dateStart,dateEnd));
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
