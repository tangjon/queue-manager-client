import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActionEntryLog} from "../shared/model/actionentrylog";
import {User} from "../shared/model/user";
import {AngularFireDatabase} from "angularfire2/database";
import {forkJoin} from "rxjs/observable/forkJoin";
import {Observable} from "rxjs/Observable";

/*
* [REFACTORED] March 29th 2018
* */

@Injectable()
export class ArchiveService {
  archivEntryAPI = 'archive_entry';
  archiveUserAPI = 'archive_user';
  archiveLogAPI = 'archive_log';


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(public http: HttpClient, public firebase: AngularFireDatabase) {
  }

  add(logs: ActionEntryLog[], users: User[]) {
    // Generate a KEY
    const ARCHIVE_KEY = this.firebase.createPushId();

    // Prepare Archive Entry
    let archiveEntry$ = this.http.post(this.archivEntryAPI, this.generateArchiveEntryBody(ARCHIVE_KEY));

    // Prepare Requests for Users
    let batch_user_add = [];
    users.forEach(user => {
      let body = this.generateUserBody(user, ARCHIVE_KEY);
      batch_user_add.push(this.http.post(this.archiveUserAPI, body, this.httpOptions))
    });
    if (batch_user_add.length == 0) {
      batch_user_add.push(Observable.of({}));
    }

    // Prepare Requests for Logs
    let batch_log_add = [];
    logs.forEach((log: ActionEntryLog) => {
      const body = this.generateLogBody(ARCHIVE_KEY, log);
      batch_log_add.push(this.http.post(this.archiveLogAPI, body, this.httpOptions))
    });
    if (batch_log_add.length == 0) {
      batch_log_add.push(Observable.of({}));
    }

    // Return as on observable
    return forkJoin(archiveEntry$, forkJoin(batch_user_add), forkJoin(batch_log_add));
  }

  remove() {

  }

  private generateLogBody(ARCHIVE_KEY: string | null, log: ActionEntryLog) {
    return {
    };
  }

  private generateArchiveEntryBody(ARCHIVE_KEY) {
    return {
      KEY: ARCHIVE_KEY,
      DATE: new Date()
    }
  }


  private generateUserBody(user: User, ARCHIVE_KEY) {
    // noinspection SpellCheckingInspection
    return {
      // ARCHIVE_KEY: ARCHIVE_KEY,
      // INUMBER: user.iNumber,
      // NAME: user.name,
      // KEY: user.key,
      // ISAVAILABLE: user.isAvailable.toString(),
      // CURRENTQDAYS: user.currentQDays.toString(),
      // USAGEPERCENT: user.usagePercent.toString()
    };
  }


}
