import { Injectable } from '@angular/core';
import { Role } from '../model/role';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Incidents } from '../model/incidents';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';

@Injectable()
export class RoleSetService {
  private api: string = "https://qmdatabasep2000140239trial.hanatrial.ondemand.com/hana_hello/data.xsodata/role"
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  constructor(public http: HttpClient) { }

  // Handle with care booleans are return as strings!
  getRoleSet(): Observable<any> {
    return this.http.get(this.api, this.httpOptions)
      .map((res: any) => {
        // OPTION 1 (SINGULAR)
        // let tmp = new Role();
        // let array: Array<any> = res.d.results.filter(el => {
        //   return el.KEY == key;
        // });
        // tmp.update(array[0])
        // return tmp;

        // OPTION 2 (ENTIRE SET)
        let arr: Array<any> = res.d.results;
        let obj = {};
        for (var i = 0; i < arr.length; i++) {
          let tmp = new Role();
          tmp.update(arr[i]);
          obj[arr[i].KEY] = tmp;
        }
        return obj;
      })
  }

  updateRoleSet(user: User, role: string, status: boolean) {
    // work around cause i dont have patch
    let tmp: Role = new Role();
    tmp.update(user.role);
    tmp[role] = status;
    // Work Around Server Doesnt Accept Boolean must convert to strings...
    // Convert to booleans to strings
    let newRoles = {}
    let keys = Object.keys(tmp);
    for (var i = 0; i < keys.length; i++) {
      newRoles[keys[i]] = tmp[keys[i]].toString();
    }
    let url = `${this.api}('${user.key}')`;
    return this.http.put(url, newRoles, this.httpOptions);
  }

  createRoleSet(key: string) {
    let tmp = new Role();
    let send = tmp.toJSONDBString();
    send["KEY"] = key;
    return this.http.post(this.api, send, this.httpOptions).map((r:any) => {
      let tmp = new Role();
      tmp.update(r.d);
      return tmp;
    })
  }

  deleteRoleSet(key: string) {
    let url = `${this.api}('${key}')`;
    return this.http.delete(url, this.httpOptions)
  }
}
