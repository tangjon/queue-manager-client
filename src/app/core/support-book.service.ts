import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProductService} from "./product.service";
import {forkJoin} from "rxjs/observable/forkJoin";

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

  setSupport(UID: string, productKey: string, bool: boolean) {
    const url = `${this.api}(KEY='${productKey}',UID='${UID}')`;
    const body = {
      SUPPORT: bool.toString()
    };
    return this.http.put(url, body, this.httpOptions);
  }

  // create row for each current product
  initializeUserSet(UID) {
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

  addComponet(UID: string, productKey: string) {
    let body = {
      KEY: productKey,
      UID: UID
    };
    return this.http.post(this.api, body, this.httpOptions)
  }

  removeComponent(UID: string, productKey: string) {
    return this.http.delete(`${this.api}(KEY='${productKey}',UID='${UID}')`)
  }


}
