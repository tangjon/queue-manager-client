import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import {tap} from 'rxjs/operators';
import {BodyParser} from "../model/bodyParser";

@Injectable()
export class UserSetService {
  private api: string = environment.apiUrl + 'users';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(public http: HttpClient) {
    // this.getUserSet({
    //   key: '-L6NWB0vTHL_YJzPVshf'
    // }).subscribe((t) => {
    //   console.log(t);
    // })
  }


  getUserSets() {
    return this.http.get(this.api, this.httpOptions)
      .map((res: any) => {
        let arr: Array<any> = res.d.results;
        let obj = {};
        for (let i = 0; i < arr.length; i++) {
          obj[arr[i].KEY] = new User(arr[i]);
        }
        return obj;
      })
  }

  getUserSet(query): Observable<any> {
    if (!query.key && !query.iNumber) return Observable.of([]);
    if (query.key) {
      return this.http.get(this.api + `('${query.key}')`, this.httpOptions)
        .map((r) => BodyParser.parseBody(r));
    } else {
      return this.http.get(this.api + `?$filter=INUMBER eq '${query.iNumber}'`, this.httpOptions)
        .map((r) => BodyParser.parseBody(r));
    }
  }

  getUserSetArray() {
    return this.http.get(this.api, this.httpOptions)
      .map((res: any) => {
        let arr: Array<any> = res.d.results;
        return arr.map(rawUser => new User(rawUser));
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
    user.currentQDays = 0;
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

  // Removes __metadata from the body;
  // private bodyParser(body) {
  //   const { __metadata, ...newObject } = body.d;
  //   console.log(newObject);
  //   return newObject;
  // }
}
