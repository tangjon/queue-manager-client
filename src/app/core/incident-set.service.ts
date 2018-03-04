import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {IncidentBook} from '../model/incidents';
import {User} from '../model/user';
import {environment} from "../../environments/environment";
import {ProductService} from "./product.service";
import {forkJoin} from "rxjs/observable/forkJoin";

@Injectable()
export class IncidentSetService {

  private api: string = environment.apiUrl + "incidents";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient, public productService: ProductService) {

  }

  // getIncidentSet(): Observable<any> {
  //   return this.http.get(this.api, this.httpOptions)
  //     .map((res: any) => {
  //       let arr: Array<any> = res.d.results;
  //       let obj = {};
  //       for (let i = 0; i < arr.length; i++) {
  //         let tmp = new IncidentBook();
  //         tmp.update(arr[i]);
  //         obj[arr[i].KEY] = tmp;
  //       }
  //       console.log(obj)
  //       return obj;
  //     })
  // }

  getIncidentSet(): Observable<any> {
    return forkJoin([
      this.http.get(this.api, this.httpOptions).map((r: any) => r.d.results),
      this.productService.getProducts()
    ]).map((data: any[]) => {
      const [respIncident, products] = data;
      let obj = {};
      respIncident.forEach((user: any) => {
        let book = new IncidentBook();
        let member = {};
        let key = user.KEY;
        products.forEach((key: string) => {
          member[key] = user[key];
        });
        book.update(member);
        obj[key] = book;
      });
      return obj;
    })
  }

  updateIncidentSet(user: User, area: string, amount: number) {
    // work around cause i don't have patch
    let tmp: IncidentBook = new IncidentBook();
    tmp.update(user.incidentBook.areas);
    tmp.areas[area] = amount;
    let url = `${this.api}('${user.key}')`;
    return this.http.put(url, tmp.areas, this.httpOptions);
  }

  createIncidentSet(key: string) {
    return this.productService.getProducts().switchMap((area: any[]) => {
      // buiild a support object
      let tmp = new IncidentBook();
      area.forEach(key => {
        tmp.areas[key] = 0;
      });
      tmp.areas["KEY"] = key;
      console.log(tmp.areas);
      return this.http.post(this.api, tmp.areas, this.httpOptions).map((r: any) => {
        let tmp = new IncidentBook();
        console.log(r);
        // tmp.update(r.d);
        return tmp;
      })
    })
    // let tmp = new IncidentBook();
    // area.forEach(key => {
    //   tmp.areas[key] = false;
    // });
    // tmp["KEY"] = key;
    // return this.http.post(this.api, tmp, this.httpOptions).map((r: any) => {
    //   let tmp = new IncidentBook();
    //   tmp.update(r.d);
    //   return tmp;
    // });
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
