import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProductService} from "./product.service";
import {forkJoin} from "rxjs/observable/forkJoin";
import {Observable} from "rxjs/Observable";

/*
* [REFACTORED] March 29th 2018
* */

@Injectable()
export class SupportBookService {
  api = environment.apiUrl + 'support_book';
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
      const uSupportObj = {};
      res.d.results.forEach((el: any) => uSupportObj[el.KEY] = el.SUPPORT);
      return uSupportObj;
    });
  }

  /**
   * @param UID Unique ID entry on database
   * @param productKey  i.e 'NW' or 'SA.
   * @param bool Value to be set to user
   */
  set(UID: string, productKey: string, bool: boolean): Observable<any> {
    const url = `${this.api}(KEY='${productKey}',UID='${UID}')`;
    const body = {
      SUPPORT: bool.toString()
    };
    return this.http.put(url, body, this.httpOptions);
  }

  // create row for each current product
  createSupportSet(UID): Observable<any> {
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
        const uSupportObj = {};
        res.forEach((el: any) => uSupportObj[el.KEY] = el.SUPPORT);
        return uSupportObj;
      });
    });
  }

  /**
  * Called when a component is added from application. Typically called for all users
  * @param UID
  * @param productKey Product key to be added. i.e 'NW"
  */
  addComponent(UID: string, productKey: string): Observable<any> {
    let body = {
      KEY: productKey,
      UID: UID
    };
    return this.http.post(this.api, body, this.httpOptions)
  }

  /**
   * Called when a component is removed from application. Typically called for all users
   * @param UID
   * @param productKey Product key to be removed. i.e 'NW"
   */
  removeComponent(UID: string, productKey: string): Observable<any> {
    return this.http.delete(`${this.api}(KEY='${productKey}',UID='${UID}')`)
  }


}
