import {Injectable} from '@angular/core';
import {Role} from '../model/support';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user';
import {environment} from "../../environments/environment";

@Injectable()
export class RoleSetService {
  private api: string = environment.apiUrl + "role";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(public http: HttpClient) { }

  // Handle with care booleans are return as strings!
  getRoleSet(): Observable<any> {
    return this.http.get(this.api, this.httpOptions)
      .map((res: any) => {
        let arr: Array<any> = res.d.results;
        let obj = {};
        for (let i = 0; i < arr.length; i++) {
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
    let newRoles = {};
    let keys = Object.keys(tmp);
    for (let i = 0; i < keys.length; i++) {
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
