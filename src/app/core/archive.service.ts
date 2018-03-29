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

  get() {

  }

  add(logs: EntryLog[], users: User[]) {

    let archive_id = this.firebase.createPushId();
    let batch_user_add = [];
    users.forEach(user => {
      let body = this.generateBody(user, archive_id);
      batch_user_add.push(this.http.post(this.archiveUserAPI, body, this.httpOptions))
    });

    let batch_log_add = [];
    logs.forEach((log: EntryLog) => {
      const body = {
        'ARCHIVE_ID': archive_id,
        'PUSH_ID': log.pushID,
        'ACTION': log.action,
        'MANAGER': log.getLogger(),
        'DATE': JSON.stringify(log.getFullDate()),
        'DESCRIPTION': log.description,
        'NAME': log.userName,
        'INUMBER': log.iNumber
      };
      batch_log_add.push(this.http.post(this.archiveLogAPI, body, this.httpOptions))
    });
    if (batch_log_add.length == 0) {
      batch_log_add.push(Observable.of({}));
    }
    let archiveEntry$ = this.http.post(this.archivEntryAPI, {ID: archive_id, DATE: new Date()});

    return forkJoin(archiveEntry$, forkJoin(batch_user_add), forkJoin(batch_log_add));


  }

  remove() {

  }

  private generateBody(user: User, archive_id) {
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
