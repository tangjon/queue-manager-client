import {Injectable} from '@angular/core';
import {Support} from '../model/support';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user';
import {environment} from "../../environments/environment";
import {ProductService} from "./product.service";
import {forkJoin} from 'rxjs/observable/forkJoin'
import {IncidentBook} from "../model/incidents";

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
  getSupportSet(): Observable<any> {
    return forkJoin([
      this.http.get(this.api, this.httpOptions).map((r: any) => r.d.results),
      this.productService.getProducts()
    ]).map((data: any[]) => {
      // const [respRoleSet, products] = data;
      // let obj = {};
      // respRoleSet.forEach((user: any) => {
      //   let support = new Support();
      //   let member = {};
      //   let key = user.KEY;
      //   products.forEach((key: string) => {
      //     member[key] = user[key];
      //   });
      //   support.set(member);
      //   obj[key] = support;
      // });
      // return obj;

      const [supportSetResponse, products] = data;
      let supportSet = {};
      // process incidentSetResponse to IncidentBooks
      supportSetResponse.forEach((user: any) => {
        let book = new Support();
        // set incident book areas
        products.forEach((key: string) => {
          book.updateArea(key, JSON.parse(user[key]));
        });
        // add to incident set
        supportSet[user.KEY] = book;
      });
      console.log(supportSet);
      return supportSet;
    })
  }

  updateSupportSet(user: User, area: string, status: boolean) {
    let copy: Support = new Support();
    copy.set(user.support.getAreas());
    copy.updateArea(area,status);
    // Work Around Server Doesnt Accept Boolean must convert to strings...
    // Convert to booleans to strings
    let url = `${this.api}('${user.key}')`;
    return this.http.put(url, copy.toJSONDBString(), this.httpOptions);
  }

  createSupportSet(key: string) {
    return this.productService.getProducts().switchMap((areas: any[]) => {
      // build a support object
      let tmp = new Support();
      areas.forEach(area => {
        tmp.addArea(area)
      });
      tmp.areas["KEY"] = key;
      return this.http.post(this.api, tmp.toJSONDBString(), this.httpOptions).map((r: any) => {
        return tmp;
      })
    })
  }

  deleteRoleSet(key: string) {
    let url = `${this.api}('${key}')`;
    return this.http.delete(url, this.httpOptions)
  }
}
