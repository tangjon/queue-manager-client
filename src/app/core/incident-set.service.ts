import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {IncidentBook} from '../model/incidents';
import {User} from '../model/user';
import {environment} from "../../environments/environment";

@Injectable()
export class IncidentSetService {

  private api: string = environment.apiUrl + "incidents";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(public http: HttpClient) {

  }

  getIncidentSet(): Observable<any> {
    return this.http.get(this.api, this.httpOptions)
      .map((res: any) => {
        // let tmp = new Incidents();
        // let array: Array<any> = res.d.results.filter(el => {
        //   return el.KEY == key;
        // });
        // tmp.update(array[0])
        // return tmp;

        let arr: Array<any> = res.d.results;
        let obj = {};
        for (let i = 0; i < arr.length; i++) {
          let tmp = new IncidentBook();
          tmp.update(arr[i]);
          obj[arr[i].KEY] = tmp;
        }
        return obj;
      })
  }

  updateIncidentSet(user: User, role: string, amount: number) {
    // work around cause i don't have patch
    let tmp: IncidentBook = new IncidentBook();
    tmp.update(user.incidents);
    tmp[role] = amount;
    let url = `${this.api}('${user.key}')`;
    return this.http.put(url, tmp, this.httpOptions);
  }

  createIncidentSet(key: string) {
    let tmp = new IncidentBook();
    tmp["KEY"] = key;
    return this.http.post(this.api, tmp, this.httpOptions).map((r: any) => {
      let tmp = new IncidentBook();
      tmp.update(r.d);
      return tmp;
    });
  }

  deleteIncidentSet(key: string) {
    let url = `${this.api}('${key}')`;
    return this.http.delete(url, this.httpOptions)
  }

  resetIncidentSet(key) {
    let tmp = new IncidentBook();
    let url = `${this.api}('${key}')`;
    return this.http.put(url, tmp, this.httpOptions)
  }
}
