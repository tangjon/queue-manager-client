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
        return arr;
      })
  }

  addProducts() {

  }

  removeProduct() {

  }
}
