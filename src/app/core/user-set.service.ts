import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user';
import {environment} from "../../environments/environment";

@Injectable()
export class UserSetService {
  private api: string = environment.apiUrl + 'users';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(public http: HttpClient) { }


  getUserSet() {
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
}
