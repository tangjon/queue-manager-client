import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
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
    return this.http.get(this.api, this.httpOptions).pipe(
      map((res: any) => {
        let productList = [];
        if (res.code === 200) {
          res.data.forEach(el => {
            productList.push(el.short_name);
          });
          Helper.sortAlpha(productList); // sorts array alphabetically
        }
        return productList;
      }));
  }

  addProduct(productShortName): Observable<any> {
    return this.http.post(this.api, {short_name: productShortName}, this.httpOptions)
      .pipe(catchError(e => Helper.handleError(e, "Add Product Failed")));
  }

  removeProduct(productShortName): Observable<any> {
    return this.http.delete(`${this.api}/${productShortName}`)
      .pipe(catchError(e => Helper.handleError(e, "Remove Product Failed")));
  }
}
