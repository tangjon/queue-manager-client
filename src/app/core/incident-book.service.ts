import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {forkJoin} from "rxjs/observable/forkJoin";
import {ProductService} from "./product.service";

@Injectable()
export class IncidentBookService {
  api = environment.apiUrl + 'incident_book';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(public http: HttpClient, public productService: ProductService) {
  }

  get(UID: string) {
    const url = `${this.api}?$filter=UID eq '${UID}'`;
    return this.http.get(url).map((res: any) => {
      const uIncidentObj = {};
      res.d.results.forEach((el: any) => uIncidentObj[el.KEY] = el.COUNT);
      return uIncidentObj;
    });
  }

  setCount(UID: string, productKey: string, count: number) {
    const url = `${this.api}(KEY='${productKey}',UID='${UID}')`;
    const body = {
      COUNT: count
    };
    return this.http.put(url, body, this.httpOptions);
  }

  // Needs to add new product to each engineer in the system...
  addComponet(UID: string, productKey: string) {
    let body = {
      KEY: productKey,
      UID: UID
    };
    return this.http.post(this.api, body, this.httpOptions)
  }

  initializeUser(UID) {
    return this.productService.getProducts().switchMap(prodList => {
      const batch$ = [];
      prodList.forEach(p => {
        const body = {
          "UID": UID,
          "KEY": p
        };
        batch$.push(this.http.post(this.api, body, this.httpOptions).map((r: any) => r.d));
      });
      return forkJoin(batch$).map(res => {
        const uIncidentObj = {};
        res.forEach((el: any) => uIncidentObj[el.KEY] = el.SUPPORT);
        return uIncidentObj;
      });
    });
  }

  removeComponent(UID: string, productKey: string) {
    return this.http.delete(`${this.api}(KEY='${productKey}',UID='${UID}')`)
  }

}
