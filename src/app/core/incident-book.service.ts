import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class IncidentBookService {
  api = environment.apiUrl + 'incident_book';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(public http: HttpClient) {
  }

  // consider only using get?
  getSnapShot() {
    const url = `${this.api}`;
    this.http.get(url, this.httpOptions)
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
    console.log(url);
    return this.http.put(url, body, this.httpOptions);
  }

  // Needs to add new product to each engineer in the system...
  add(UID: string, productKey: string) {

  }

  remove(UID: string, productKey: string) {

  }

}
