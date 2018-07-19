import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {LogService} from './log.service';
import {environment} from "../../environments/environment";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {ProductService} from "./product.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {User} from "../shared/model/user";
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  /* ERROR MESSAGES */
  USER_NOT_FOUND: string = "USER NOT FOUND";
  private userapi: string = environment.api + 'users/';
  private qmapi: string = environment.api + 'users/qm/';
  private incidentapi: string = environment.api + 'incidents/';
  private productapi: string = environment.api + 'products/';
  private userSource = new BehaviorSubject<User[]>([]);

  constructor(public db: AngularFireDatabase,
              public http: HttpClient,
              public logService: LogService,
              public productService: ProductService,
  ) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get(this.userapi)
      .map((resp: any) => {
          // verify response
          if (resp.code === 200) {
            return resp.data.map(el =>
              // populate the User Model
              new User(el.user_id, el.first_name, el.last_name, el.is_available, el.current_q_days, el.incident_threshold, el.usage_percent, el.incident_counts, el.supported_products)
            )
          } else {
            return Observable.throw(new ErrorObservable("Error"));
          }
        }
      );
  }

  getUserByNumber(iNumber: string): Observable<User> {
    if (!iNumber) return Observable.throw(new ErrorObservable("Empty Argument"));
    const url = this.userapi + iNumber;
    return this.http.get(url).map((resp: any) => {
      if (resp.code === 200) {
        return new User(resp.data.user_id, resp.data.first_name, resp.data.last_name, resp.data.is_available, resp.data.current_q_days, resp.data.incident_threshold, resp.usage_perecent, resp.data.incident_counts, resp.data.supported_products)
      } else {
        throw new Error("User not found")
      }
    })
      .pipe(
        catchError((e) => this.handleError(e, "Failed to get user"))
      )
  }

  addUser(firstName: string, iNumber: string): Observable<User> {
    let body = {
      "user_id": iNumber,
      "first_name": firstName,
      "last_name": ""
    };
    return this.http.post(this.userapi, body, this.httpOptions).switchMap(() => {
      return this.getUserByNumber(iNumber);
    })
  }

  // todo fix
  updateUser(user: User) {
    // return this.userSetService.updateUserSet(user);
  }

  updateAvailability(user: User, bool: boolean): Observable<any> {
    let body = this.buildBodyFromUserObject(user);
    body.is_available = bool;
    return this.http.put(this.userapi + user.iNumber, body, this.httpOptions)
      .pipe(
        catchError(e => this.handleError(e, "Update Availability Failed"))
      )
  }

  deleteUser(key: string) {
    Observable.of()
    // return this.userSetService.deleteUserSet(key).map(() => {
    //   return true;
    // }).pipe(catchError(e => this.handleError(e, "Delete User Failed")));
  }

  // addComponent(productId): Observable<boolean> {
  //   return this.getUsers().switchMap((users) => {
  //       let batchAdd$ = [];
  //       users.forEach((user: User) => {
  //         batchAdd$.push(this.supportBookService.addComponent(user.key, productId));
  //         batchAdd$.push(this.incidentBookService.addComponent(user.key, productId));
  //       });
  //       batchAdd$.push(this.productService.addProduct(productId));
  //       return forkJoin(batchAdd$).map(() => {
  //         return true;
  //       }).pipe(catchError(e => this.handleError(e, "Add Component Failed")))
  //     }
  //   )
  // }

  // removeComponent(productId): Observable<boolean> {
  //   return this.getUsers().switchMap((users) => {
  //       let batchAdd$ = [];
  //       users.forEach((user: User) => {
  //         batchAdd$.push(this.supportBookService.removeComponent(user.key, productId));
  //         batchAdd$.push(this.incidentBookService.removeComponent(user.key, productId));
  //       });
  //       batchAdd$.push(this.productService.removeProduct(productId));
  //       return forkJoin(batchAdd$).map(() => {
  //         return true
  //       }).pipe(catchError(e => this.handleError(e, "Remove Component Failed")))
  //     }
  //   )
  // }

  updateSupport(user: User, productShortName: string, bool: boolean) {
    const body = {
      "supported" : bool
    };
    return this.http.put(`${this.userapi}${user.iNumber}/${productShortName}`,body, this.httpOptions).map((res:any) => {
      if(res.code === 200){
        return res;
      } else {
        throw new Error();
      }
    }).pipe(catchError(e => this.handleError(e, "Failed to update support")))
  }

  addIncident(user: User, productId: string): Observable<any> {
    let body = {
      "product_short_name": productId,
      "user_id": user.iNumber
    };
    return this.http.post(this.incidentapi, body, this.httpOptions)
      .pipe(catchError(e => this.handleError(e, "Add Incident Failed")))
    // return this.incidentBookService.set(user.key, productId, amount)
    //   .pipe(
    //     tap(() => {
    //       if (amount > user.getIncidentAmount(productId)) {
    //         this.logService.addLog(user, 'Incident Assigned', `${user.getIncidentAmount(productId)} to ${amount} in ${productId}`)
    //       } else {
    //         this.logService.addLog(user, 'Incident Unassigned', `${user.getIncidentAmount(productId)} to ${amount} in ${productId}`)
    //       }
    //     }),
    //
    //   );
  }

  removeIncident(user: User, productShortName: string): Observable<any> {
    const body = {
      "user_id": user.iNumber,
      "product_short_name": productShortName
    };
    return this.http.delete(this.incidentapi + `${user.iNumber}/${productShortName}`, this.httpOptions)
      .pipe(catchError(e => this.handleError(e, "Remove Incident Failed")))
  }

  // TODO Refactor out, redundant and sub-clone of #Update Queue Days
  restQueueDays(user: User) {
    return Observable.of(5)
    // let tmp = new User(user);
    // tmp.currentQDays = 0;
    // return this.userSetService.resetRCC(tmp)
    //   .pipe(catchError(e => this.handleError(e, "Reset Queue Days Failed")));
  }

  updateQueueDays(user, amount) {
    return Observable.of(5)
    // let tmp = new User(user);
    // tmp.currentQDays = amount;
    // return this.updateUser(tmp).map(() => amount)
    //   .pipe(
    //     tap(() => {
    //       this.logService.addLog(user, "Queue Days Changed", user.currentQDays + " to " + tmp.currentQDays);
    //     }),
    //     catchError(
    //       e => this.handleError(e, "Update Queue Days Failed"))
    //   );
  }

  getQM(): Observable<User> {
    return this.http.get(this.qmapi).map((resp: any) => {
      if (resp.code !== 200) throw new Error("error");
      return new User(resp.data.user_id, resp.data.first_name, resp.data.last_name, resp.data.is_available, resp.data.current_q_days, resp.data.incident_threshold, resp.usage_percent, resp.data.incident_counts, resp.data.supported_products)
    }).pipe(catchError(e => this.handleError(e, "Failed to get QM")))
  }

  setQM(iNumber: string) {
    return this.getUserByNumber(iNumber).switchMap(
      (user: User) => {
        // noinspection SpellCheckingInspection
        const body = {
          "user_id": user.iNumber
        };
        return this.http.put(this.qmapi, body, this.httpOptions);
      }
    ).pipe(catchError(e => this.handleError(e, "Failed to set QM")))
  }

  handleError(error?: HttpErrorResponse, message?: string) {
    if (message.length == 0) {
      message = "Something went wrong"
    }
    if (!environment.production) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
        // if (error.error == null) {
        //   return new ErrorObservable(this.USER_NOT_FOUND);
        // }
      }
    }
    if (error.status === 0) {
      message = "DATABASE IS DOWN :: " + message;
    }
    return new ErrorObservable({
      "status": error.status,
      "message": `${message} : ${error.message}`
    })
  }

  private buildBodyFromUserObject(user: User) {
    return {
      "user_id": user.iNumber,
      "first_name": user.firstName,
      "last_name": user.lastName,
      "is_available": user.isAvailable,
      "usage_percent": user.usagePercent,
      "current_q_days": user.currentQDays,
      "incident_threshold": user.iThreshold
    }
  }

}
