import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/forkJoin';
import {environment} from '../../environments/environment';
import {User} from "../shared/model/user";
import {catchError, tap} from "rxjs/operators";
import {Helper} from "../shared/helper/helper";
import {ActiondId, ActionEntryLog} from "../shared/model/actionEntryLog";
import {Detail} from "../shared/model/detail";

/**
 * Service that handles call to Logs on database
 */
@Injectable()
export class LogService {
  // HTTP Request Options
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  // Service URL API Call
  private api = environment.api + '/actionentrylog';
  // Subject to be subscribed to by other components and services
  private logSource = new BehaviorSubject<ActionEntryLog[]>([]);

  /**
   * Get Logs as an observable from a behavior subject. New updates will be listened to.
   * @returns             Array of entry logs.
   * @param numOfResults  Number of results to return.
   */
  private entryLogSubject = new BehaviorSubject<ActionEntryLog[]>([]);

  private actionList = [];

  constructor(public http: HttpClient, public db: AngularFireDatabase) {
    this.http.get(this.api + '/actions', this.httpOptions).map((r: any) => r.data).subscribe((res: Array<object>) => {
      this.actionList = res;
    })
  }


  /**
   * Get all logs from database.
   * @returns Array of logs
   */
  getLogs(): Observable<any[]> {
    return this.http.get(this.api, this.httpOptions).switchMap((result: any) => {
      let data = result.data.map(el => new ActionEntryLog({
        loggerInumber: el.logger_id,
        affectedInumber: el.affected_user_id,
        affectedUserName : el.affected_user_name,
        actionId: el.action_id,
        defaultDescription: el.description,
        detail: el.detail,
        timestamp: el.timestamp
      }));
      this.entryLogSubject.next(data);
      return this.entryLogSubject
    }).pipe(
      catchError(err => Helper.handleError(err, "Failed to get log"))
    )
  }

  /**
   * Add a log to database
   * @returns
   */
  // TODO Should return an observable so front end and know whether a log was successful
  addLog(affectedUser: User, actionId: ActiondId, detail: Detail) {
    let cINumber = this.getCachedINumber();
    // Create Entry Log from model
    let newEntryLog = new ActionEntryLog({
      "actionId": actionId,
      "loggerInumber": cINumber,
      "affectedUserName": affectedUser.name(),
      "affectedInumber": affectedUser.iNumber,
      "detail": detail
    });
    if (this.actionList.length) {
      let t = this.actionList.filter(i => i.action_id == actionId);
      if (t.length) {
        newEntryLog.defaultDescription = t[0].description;
      }
    }
    // Prepare request body
    const body = newEntryLog.generatePostBody();
    this.http.post(this.api, body, this.httpOptions)
      .pipe(
        tap(r => {
          this.entryLogSubject.getValue().unshift(newEntryLog);
        }),
        catchError(err => Helper.handleError(err, "Failed to add log"))
      ).subscribe(() => {

    })
  }

  /**
   * Delete all logs on database
   */
  purgeLogs(): Observable<any> {
    const $batch = [];
    this.logSource.getValue().forEach((el: ActionEntryLog) => {
      const url = ""
      $batch.push(this.http.delete(url));
    });
    if ($batch.length == 0) {
      return Observable.of([]);
    } else {
      return Observable.forkJoin($batch).pipe(tap(() => {
        this.logSource.next([]);
      })).pipe(
        catchError(err => Helper.handleError(err, "Failed to purge logs"))
      )
    }
  }

  // HELPER FUNCTIONS
  /**
   * @returns cached Inumber stored in localstorage
   */
  getCachedINumber() {
    return localStorage[environment.KEY_CACHE_INUMBER];
  }

  setCachedINumber(i: string) {
    localStorage[environment.KEY_CACHE_INUMBER] = i
  }

  refresh() {
    this.getLogs().subscribe(logs => {
      this.logSource.next(logs);
    }, error => console.log(error))
  }

}
