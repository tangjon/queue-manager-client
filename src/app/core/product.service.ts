import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {catchError} from "rxjs/operators";
import {Helper} from "../shared/helper/helper";

@Injectable()
export class ProductService {
  private api: string = environment.api + "/products";
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
        let productList = [];
        if (res.code === 200) {
          res.data.forEach(el => {
            productList.push(el.short_name)
          });
          sortAlpha(productList); // sorts array alphabetically
        }
        return productList;
      });

    function sortAlpha(arr) {
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
    }
  }

  addProduct(productShortName): Observable<any> {
    return this.http.post(this.api, {short_name: productShortName}, this.httpOptions)
      .pipe(catchError(e => Helper.handleError(e, "Add Product Failed")))
  }

  removeProduct(productShortName): Observable<any> {
    return this.http.delete(`${this.api}/${productShortName}`)
      .pipe(catchError(e => Helper.handleError(e, "Remove Product Failed")))
  }
}
