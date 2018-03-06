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

  getSnapShot() {

  }

  get(UID: string) {
    const url = `${this.api}?$filter=UID eq '${UID}'`;
    return this.http.get(url).map((res: any) => {
      const uSupportObj = {};
      res.d.results.forEach((el: any) => uSupportObj[el.KEY] = el.SUPPORT);
      return uSupportObj;
    });
  }

  setCount(UID: string, productKey: string, bool: boolean) {
    const url = `${this.api}(KEY='${productKey}',UID='${UID}')`;
    const body = {
      SUPPORT: bool.toString()
    };
    console.log(url);
    return this.http.put(url, body, this.httpOptions);
  }

  // Needs to add new product to each engineer in the system...
  // go through each user and add support
  addSupport(UID: string, productKey: string) {

  }

  // create row for each current product
  initializeUser(UID) {
    this.productService.getProducts().switchMap(prodList => {
      let batch$ = [];
      prodList.forEach(p => {
        let body = {
          "UID": UID,
          "KEY": p
        };
        batch$.push(this.http.post(this.api, body, this.httpOptions))
      });
      return forkJoin(batch$);
    })
  }

  remove(UID: string, productKey: string) {

  }


}
