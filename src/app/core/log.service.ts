import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActionEntryLog} from '../shared/model/actionentrylog';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/forkJoin';
import {environment} from '../../environments/environment';
import {User} from "../shared/model/user";
import {catchError, tap} from "rxjs/operators";
import {Helper} from "../shared/helper/helper";

type Action =
  'Incident Assigned'
  | 'Incident Unassigned'
  | 'Availability Changed'
  | 'Queue Days Changed'
  | 'Support Changed'


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


  constructor(public http: HttpClient, public db: AngularFireDatabase) {

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
        actionId: el.action_id,
        description: el.description,
        customDescription: el.custom_description,
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
   * @param user The user performing an action
   * @param action The action done.
   * @param description i.e  April(i1232) : 0 to 1 in NW.
   */
  // TODO Should return an observable so front end and know whether a log was successful
  addLog(user: User, action: Action, description) {
    let cINumber = this.getCachedINumber() || "UNKNOWN";
    // Create Entry Log from model
    const pushId = this.db.createPushId();
    const entry = new ActionEntryLog({});
    // Prepare request body
    const body = this.generateBody(pushId, action, entry, description, user);
    this.http.post(this.api, body, this.httpOptions)
      .pipe(
        catchError(err => Helper.handleError(err, "Failed to add log"))
      )
      .subscribe(() => {
        let tmp = this.logSource.getValue();
        tmp.unshift(entry);
        this.logSource.next(tmp);
        this.db.object(environment.firebaseRootUrl + '/log-last-change').set({
          user: atob(cINumber),
          date: new Date().getTime()
        });
      }, err => this.db.object(environment.firebaseRootUrl + '/error').set({date: new Date(), msg: err}));
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

  /**
   * Generates a request body to be to sent to the api url
   * @param {string | null} pushId
   * @param {Action} action
   * @param {ActionEntryLog} entry
   * @param description
   * @param user
   * @returns {{PUSH_ID: string | null; ACTION: Action; MANAGER: any; DATE: string; DESCRIPTION: any; NAME; INUMBER: string | any}}
   */
  private generateBody(pushId: string | null, action: Action, entry: ActionEntryLog, description, user) {
    return {
      'PUSH_ID': pushId,
      'ACTION': action,
      'MANAGER': this.getCachedINumber(),
      'DATE': JSON.stringify(entry.getFullDate()),
      'DESCRIPTION': description,
      'NAME': user.name,
      'INUMBER': user.affectedInumber
    };
  }


}
