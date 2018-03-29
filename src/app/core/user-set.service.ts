import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../shared/model/user';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import {BodyParser} from "../shared/helper/bodyParser";

/*
* [REFACTORED] March 29th 2018
* */

interface Query {
  key?: string;
  iNumber?: string;
}

@Injectable()
export class UserSetService {
  private api: string = environment.apiUrl + 'users';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(public http: HttpClient) {
  }

  getUserSet(query: Query): Observable<any> {
    if (!query.key && !query.iNumber) return Observable.of([]);
    if (query.key) {
      return this.http.get(this.api + `('${query.key}')`, this.httpOptions)
        .map((r) => BodyParser.parseBody(r));
    } else {
      return this.http.get(this.api + `?$filter=INUMBER eq '${query.iNumber}'`, this.httpOptions)
        .map((r) => BodyParser.parseBody(r));
    }
  }

  getUserSets() {
    return this.http.get(this.api, this.httpOptions)
      .map((res: any) => {
        return BodyParser.parseBody(res).map(rawUser => new User(rawUser));
      })
  }

  updateUserSet(user: User) {
    let body = this.generateBody(user);
    let url = `${this.api}('${user.key}')`;
    return this.http.put(url, body, this.httpOptions);
  }

  createUserSet(name, iNumber, key) {
    let user = new User({name: name, iNumber: iNumber, key: key});
    let body = this.generateBody(user);
    return this.http.post(this.api, body, this.httpOptions).map((r: any) => {
      return new User(r.d);
    });
  }

  deleteUserSet(key) {
    let url = `${this.api}('${key}')`;
    return this.http.delete(url, this.httpOptions)
  }

  resetRCC(user: User) {
    return this.updateUserSet(user);
  }

  private generateBody(user: User) {
    // noinspection SpellCheckingInspection
    return {
      INUMBER: user.iNumber,
      NAME: user.name,
      KEY: user.key,
      ISAVAILABLE: user.isAvailable.toString(),
      CURRENTQDAYS: user.currentQDays.toString(),
      USAGEPERCENT: user.usagePercent.toString()
    };
  }
}
