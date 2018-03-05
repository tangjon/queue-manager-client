import {Injectable} from '@angular/core';
import {Support} from '../model/support';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user';
import {environment} from "../../environments/environment";
import {ProductService} from "./product.service";
import {forkJoin} from 'rxjs/observable/forkJoin'

@Injectable()
export class RoleSetService {
  private api: string = environment.apiUrl + "role";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(public http: HttpClient, public productService: ProductService) {
  }

  // Handle with care booleans are return as strings!
  getRoleSet(): Observable<any> {
    return forkJoin([
      this.http.get(this.api, this.httpOptions).map((r: any) => r.d.results),
      this.productService.getProducts()
    ]).map((data: any[]) => {
      const [respRoleSet, products] = data;
      let obj = {};
      respRoleSet.forEach((user: any) => {
        let support = new Support();
        let member = {};
        let key = user.KEY;
        products.forEach((key: string) => {
          member[key] = user[key];
        });
        support.update(member);
        obj[key] = support;
      });
      return obj;
    })
  }

  updateRoleSet(user: User, role: string, status: boolean) {
    // work around cause i dont have patch
    let tmp: Support = new Support();
    tmp.update(user.support.areas);
    tmp.areas[role] = status;
    // Work Around Server Doesnt Accept Boolean must convert to strings...
    // Convert to booleans to strings
    let updatedRoles = {};
    let keys = Object.keys(tmp.areas);
    for (let i = 0; i < keys.length; i++) {
      updatedRoles[keys[i]] = tmp.areas[keys[i]].toString();
    }
    let url = `${this.api}('${user.key}')`;
    return this.http.put(url, updatedRoles, this.httpOptions);
  }

  createRoleSet(key: string) {

    return this.productService.getProducts().switchMap((area: any[]) => {
      // buiild a support object
      let tmp = new Support();
      area.forEach(key => {
        tmp.areas[key] = false;
      });
      tmp.areas["KEY"] = key;
      return this.http.post(this.api, tmp.toJSONDBString(), this.httpOptions).map((r: any) => {
        let tmp = new Support();
        console.log(r);
        // tmp.set(r.d);
        return tmp;
      })
    })


  }

  deleteRoleSet(key: string) {
    let url = `${this.api}('${key}')`;
    return this.http.delete(url, this.httpOptions)
  }
}
