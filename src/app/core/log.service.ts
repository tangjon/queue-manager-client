import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {EntryLog} from '../shared/model/entrylog';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/forkJoin';
import {environment} from '../../environments/environment';
import {User} from "../shared/model/user";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {catchError, tap} from "rxjs/operators";
import {Helper} from "../shared/helper/helper";

type Action =
  'Incident Assigned'
  | 'Incident Unassigned'
  | 'Availability Changed'
  | 'Queue Days Changed'
  | 'Support Changed'

@Injectable()
export class LogService {
  // HTTP Request Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  // Service URL API Call
  private api = environment.apiUrl + 'activity_log';

  // Subject to be subscribed to by other components and services
  public logSource = new BehaviorSubject<EntryLog[]>([]);

  /*
* [PARTIALLY REFACTORED] March 29th 2018
* */

  constructor(public http: HttpClient, public db: AngularFireDatabase) {
    /* Populate Log Subject Behavior */
    this.getLogs().subscribe(logs => {
      this.logSource.next(logs);
    })
  }

  /**
   * Get Logs as an observable from a behavior subject. New updates will be listened to.
   * @returns             Array of entry logs.
   * @param numOfResults  Number of results to return.
   */
  getLogAsSubject(numOfResults?): Observable<EntryLog[]> {
    if (numOfResults) {
      return this.logSource.asObservable().map(log => log.slice(0, numOfResults))
    } else {
      return this.logSource.asObservable();
    }
  }

  /**
   * Get all logs on database.
   * @returns Array of logs
   */
  getLogs(): Observable<any[]> {
    return this.http.get(this.api, this.httpOptions).map((r: any) => {
      let arr = [];
      const t = r.d.results.map((t: any) => {
        const tmp = new EntryLog(t.NAME, t.INUMBER, t.ACTION, t.DESCRIPTION, t.MANAGER, t.PUSH_ID);
        tmp.setDateFromString(t.DATE);
        return tmp;
      });
      t.forEach((el: EntryLog) => {
        arr.push(el);
      });
      arr.sort(function (a: any, b: any) {
        return b.date - a.date;
      });
      return arr;
    })
  }

  /**
   * Get all logs on database.
   * @returns
   * @param user The user performing an action
   * @param action The action done.
   * @param description i.e  April(i1232) : 0 to 1 in NW.
   */
  addLog(user: User, action: Action, description) {
    // Create Entry Log from model
    const pushId = this.db.createPushId();
    const entry: EntryLog = new EntryLog(
      user.name, user.iNumber,
      action, description, this.getCachedINumber(),
      pushId
    );
    // Prepare request body
    const body = this.generateBody(pushId, action, entry, description, user);
    this.http.post(this.api, body, this.httpOptions).subscribe(() => {
      let tmp = this.logSource.getValue();
      tmp.unshift(entry);
      this.logSource.next(tmp);
      this.db.object(environment.firebaseRootUrl + '/log-last-change').set({
        user: atob(this.getCachedINumber()),
        date: new Date().getTime()
      });
    }, err => this.db.object(environment.firebaseRootUrl + '/error').set({date: new Date(), msg: err}));
  }

  purgeLogs(): Observable<any> {
    const $batch = [];
    this.logSource.getValue().forEach((el: EntryLog) => {
      const url = `${this.api}('${el.KEY}')`;
      $batch.push(this.http.delete(url));
    });
    if ($batch.length == 0) {
      return Observable.of([]);
    } else {
      return Observable.forkJoin($batch).pipe(tap(() => {
        this.logSource.next([]);
      })).pipe(
        catchError(err => Observable.throw(this.handleError(err, "purge log failed"))
        ))
    }
  }

  getAssignmentCountByDate(user: User, date_begin, date_end) {
    const logs = this.logSource.getValue();
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
  }

  getAssignmentCount(user: User) {
    const logs = this.logSource.getValue();
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

    function dateInRangeToday(arg: Date): boolean {
      const today = new Date();
      const tmp = new Date(arg);
      return tmp.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
    }
  }

  /* HELPER FUNCTIONS */
  getCachedINumber() {
    return localStorage[environment.KEY_CACHE_INUMBER];
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

  private handleError(error: HttpErrorResponse, message: string) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      console.log(error);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable("Something went wrong: " + error);
  }

}
