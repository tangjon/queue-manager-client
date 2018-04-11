import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {User} from '../shared/model/user';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import {BodyParser} from "../shared/helper/bodyParser";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";

interface Query {
  key?: string;
  iNumber?: string;
}

/**
 * Service that retrieves a portion of the user object
 * i.e Current Queue Days, RCC Information
 */
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

  /**
   * Get user set with specific query
   * @param query json object with member of 'key' or iNumber
   * @return user set object, portion of user a user object
   */
  getUserSet(query: Query): Observable<any> {
    let url;
    if (!query.key && !query.iNumber) return Observable.of([]);
    if (query.key) {
      url = this.api + `('${query.key}')`
    } else {
      url = this.api + `?$filter=INUMBER eq '${query.iNumber}'`
    }
    return this.http.get(url, this.httpOptions)
      .map((r) => BodyParser.parseBody(r))
  }

  /**
   * Get all user sets from database
   * @returns Observable of user sets in an object
   */
  getUserSets(): Observable<any> {
    return this.http.get(this.api, this.httpOptions)
      .map((res: any) => {
        return BodyParser.parseBody(res).map(rawUser => new User(rawUser));
      })
  }

  /**
   * Update the user set
   * @param {User} user that will be updated
   * @returns Http Server Response
   */
  updateUserSet(user: User): Observable<any> {
    let body = this.generateBody(user);
    let url = `${this.api}('${user.key}')`;
    return this.http.put(url, body, this.httpOptions);
  }

  /**
   * Create a user set
   * @param {String} name of user
   * @param iNumber
   * @param key
   * @returns {Observable<User>}
   */
  createUserSet(name: string, iNumber: string, key: string) {
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

  private handleError(error: HttpErrorResponse) {
    if(error.statusText==="Unknown Error") return new ErrorObservable(`Something went wrong: ${error.message}`);
  }
}
