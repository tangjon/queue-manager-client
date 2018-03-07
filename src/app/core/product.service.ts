import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ProductService {
  private api: string = environment.apiUrl + "product";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(public http: HttpClient) {

  }

  getProducts(): Observable<string[]> {
    return this.http.get(this.api, this.httpOptions)
      .map((res: any) => {
        let resArr: Array<any> = res.d.results;
        let arr = [];
        resArr.forEach(el => {
          arr.push(el.KEY);
        });

        arr.sort(function (b, a) {
          if (a > b) {
            return -1;
          }
          if (a < b) {
            return 1;
          }
          return 0;
        });
        return arr;
      })
  }

  addProduct(productId) {
    return this.http.post(this.api, {KEY: productId}, this.httpOptions)
  }

  removeProduct(productId) {
    return this.http.delete(`${this.api}('${productId}')`)
  }
}
