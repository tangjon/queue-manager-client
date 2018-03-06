import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class SupportBookService {
  api = environment.apiUrl + 'support_book';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(public http: HttpClient) {
  }

  getSnapShot() {

  }

  get(UID: string, productKey: string) {
    this.http.get(`${this.api}?$filter=UID eq ${UID}`).subscribe(t => console.log(t));
  }

  set(UID: string, productKey: string, bool: boolean) {

  }

  // Needs to add new product to each engineer in the system...
  add(productKey: string) {

  }

  remove(productKey: string) {

  }


}
