import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {EntryLog} from "../shared/model/entrylog";
import {User} from "../shared/model/user";
import {AngularFireDatabase} from "angularfire2/database";
import {forkJoin} from "rxjs/observable/forkJoin";
import {Observable} from "rxjs/Observable";


@Injectable()
export class ArchiveService {
  archivEntryAPI = environment.apiUrl + 'archive_entry';
  archiveUserAPI = environment.apiUrl + 'archive_user';
  archiveLogAPI = environment.apiUrl + 'archive_log';


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(public http: HttpClient, public firebase: AngularFireDatabase) {
  }

  add(logs: EntryLog[], users: User[]) {
    // Generate a KEY
    let archive_id = this.firebase.createPushId();

    // Prepare Archive Entry
    let archiveEntry$ = this.http.post(this.archivEntryAPI, this.generateArchiveEntryBody(archive_id));

    // Prepare Requests for Users
    let batch_user_add = [];
    users.forEach(user => {
      let body = this.generateUserBody(user, archive_id);
      batch_user_add.push(this.http.post(this.archiveUserAPI, body, this.httpOptions))
    });
    if (batch_user_add.length == 0) {
      batch_user_add.push(Observable.of({}));
    }

    // Prepare Requests for Logs
    let batch_log_add = [];
    logs.forEach((log: EntryLog) => {
      const body = this.generateLogBody(archive_id, log);
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

  generateLogBody(archive_id: string | null, log: EntryLog) {
    return {
      ARCHIVE_ID: archive_id,
      KEY: log.KEY,
      ACTION: log.action,
      MANAGER: log.getLogger(),
      DATE: JSON.stringify(log.getFullDate()),
      DESCRIPTION: log.description,
      NAME: log.userName,
      INUMBER: log.iNumber
    };
  }

  private generateArchiveEntryBody(archive_id) {
    return {
      ID: archive_id,
      DATE: new Date()
    }
  }

  private generateUserBody(user: User, archive_id) {
    // noinspection SpellCheckingInspection
    return {
      ARCHIVE_ID: archive_id,
      INUMBER: user.iNumber,
      NAME: user.name,
      KEY: user.key,
      ISAVAILABLE: user.isAvailable.toString(),
      CURRENTQDAYS: user.currentQDays.toString(),
      USAGEPERCENT: user.usagePercent.toString()
    };
  }


}
