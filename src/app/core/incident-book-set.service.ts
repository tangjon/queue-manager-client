import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {IncidentBook} from '../model/incidents';
import {User} from '../model/user';
import {environment} from "../../environments/environment";
import {ProductService} from "./product.service";
import {forkJoin} from "rxjs/observable/forkJoin";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {catchError} from "rxjs/operators";

@Injectable()
export class IncidentSetService {

  private api: string = environment.apiUrl + "incidents";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient, public productService: ProductService) {

  }

  /**
   * @returns      Incident Book Set of all users as one object
   */
  getIncidentSet(): Observable<any> {
    return forkJoin([
      this.http.get(this.api, this.httpOptions).map((r: any) => r.d.results),
      this.productService.getProducts()
    ]).map((data: any[]) => {
      const [incidentSetResponse, products] = data;
      let incidentBookSet = {};
      // process incidentSetResponse to IncidentBooks
      incidentSetResponse.forEach((user: any) => {
        let book = new IncidentBook();
        // set incident book areas
        products.forEach((key: string) => {
          book.updateArea(key, user[key]);
        });
        // add to incident set
        incidentBookSet[user.KEY] = book;
      });
      return incidentBookSet;
    })
  }

  updateIncidentSet(user: User, area: string, amount: number) {
    let copy = new IncidentBook();
    copy.set(user.incidentBook.getData());
    copy.updateArea(area, amount);
    let url = `${this.api}('${user.key}')`;
    return this.http.put(url, copy.getData(), this.httpOptions).pipe(catchError(this.handleError))
  }

  createIncidentSet(key: string) {
    return this.productService.getProducts().switchMap((supportAreas: any[]) => {
      // create new incident book and populate with products
      let book = new IncidentBook();
      supportAreas.forEach(area => {
        book.addArea(area);
      });
      book.data["KEY"] = key; // lastly attach key before send off
      return this.http.post(this.api, book.data, this.httpOptions).map(() => {
        return book;
      })
    })
  }

  deleteIncidentSet(key: string) {
    let url = `${this.api}('${key}')`;
    return this.http.delete(url, this.httpOptions)
  }

  resetIncidentSet(key) {
    let url = `${this.api}('${key}')`;
    return this.productService.getProducts().switchMap(products => {
      let tmp = new IncidentBook();
      products.forEach(el => tmp.addArea(el));
      return this.http.put(url, tmp.getData(), this.httpOptions);
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };
}
