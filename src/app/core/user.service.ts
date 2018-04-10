import {Injectable} from '@angular/core';
import {User} from '../shared/model/user';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {UserSetService} from './user-set.service';
import {LogService} from './log.service';
import {environment} from "../../environments/environment";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {IncidentBookService} from "./incident-book.service";
import {SupportBookService} from "./support-book.service";
import {ProductService} from "./product.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  /* ERROR MESSAGES */
  USER_NOT_FOUND:string = "USER NOT FOUND";
  private qmapi: string = environment.apiUrl + "qm('current')";
  private userSource = new BehaviorSubject<User[]>([]);

  constructor(public db: AngularFireDatabase,
              public http: HttpClient,
              public userSetService: UserSetService,
              public logService: LogService,
              public incidentBookService: IncidentBookService,
              public supportBookService: SupportBookService,
              public productService: ProductService) {
  }

  getUsers(): Observable<User[]> {
    return this.userSetService.getUserSets().switchMap((users: User[]) => {
      const userbatch$ = [];
      users.forEach(user => {
        userbatch$.push(
          forkJoin([this.incidentBookService.get(user.key), this.supportBookService.get(user.key)])
            .map(data => {
              const [incidentBook, supportBook] = data;
              user.incidentBook.set(incidentBook);
              user.supportBook.set(supportBook);
              return user;
            })
        );
      });
      return forkJoin(userbatch$);
    });
  }

  getUserByNumber(iNumber: string): Observable<User> {
    if (!iNumber) return Observable.throw(new ErrorObservable("Empty Argument"));
    return this.userSetService.getUserSet({iNumber: iNumber.toLowerCase()}).switchMap(userSet => {
      return forkJoin([
        this.supportBookService.get(userSet[0].key),
        this.incidentBookService.get(userSet[0].key)
      ]).map(data => {
        const [incidentBook, supportBook] = data;
        let user = new User(userSet[0]);
        user.incidentBook.set(incidentBook);
        user.supportBook.set(supportBook);
        return user;
      })
    }).pipe(
      catchError((e)=>this.handleError(e))
    )

      // .catch(() => Observable.throw(new ErrorObservable("User Not Found")))
  }

  getUserByKey(key): Observable<User> {
    return forkJoin([
      this.userSetService.getUserSet({key: key}),
      this.supportBookService.get(key),
      this.incidentBookService.get(key)
    ]).map(data => {
      const [userSet, incidentBook, supportBook] = data;
      let user = new User(userSet);
      user.incidentBook.set(incidentBook);
      user.supportBook.set(supportBook);
      return user;
    }).pipe(
      catchError((e)=>this.handleError(e))
    )
  }

  getUserBHO() {
    return this.getUsers().switchMap((users: User[]) => {
      this.userSource.next(users);
      return this.userSource.asObservable();
    });
  }

  addUser(name: string, iNumber: string): Observable<User> {
    const UID = this.db.createPushId();
    return forkJoin([
      this.userSetService.createUserSet(name, iNumber, UID),
      this.supportBookService.createSupportSet(UID),
      this.incidentBookService.createIncidentSet(UID)
    ]).map(data => {
        const [userFrag, supportFrag, incidentFrag] = data;
        const newUser = new User(userFrag);
        newUser.incidentBook.set(incidentFrag);
        newUser.supportBook.set(supportFrag);
        return newUser;
      }
    );
  }

  updateUser(user: User) {
    return this.userSetService.updateUserSet(user);
  }

  updateAvailability(user: User, bool: boolean) {
    let tmp = new User(user);
    tmp.setStatus(bool);
    return this.updateUser(tmp)
      .pipe(
        tap(() => this.logService.addLog(tmp, "Availability Changed", `Switched to ${tmp.getStatus()}`)
        ),
        tap(() => {
          this.db.object(environment.firebaseRootUrl + '/queue-last-change').set({
            key: tmp.key,
            action: "Availability Changed",
            value: bool
          });
        }));
  }

  deleteUser(key: string): Observable<any> {
    return this.userSetService.deleteUserSet(key).map(() => {
      return true;
    });
  }

  addComponent(productId) {
    return this.getUsers().switchMap((users) => {
        let batchAdd$ = [];
        users.forEach((user: User) => {
          batchAdd$.push(this.supportBookService.addComponent(user.key, productId));
          batchAdd$.push(this.incidentBookService.addComponent(user.key, productId));
        });
        batchAdd$.push(this.productService.addProduct(productId));
        return forkJoin(batchAdd$).map(t => {
          return "cats"
        })
      }
    )
  }

  removeComponent(productId) {
    return this.getUsers().switchMap((users) => {
        let batchAdd$ = [];
        users.forEach((user: User) => {
          batchAdd$.push(this.supportBookService.removeComponent(user.key, productId));
          batchAdd$.push(this.incidentBookService.removeComponent(user.key, productId));
        });
        batchAdd$.push(this.productService.removeProduct(productId));
        return forkJoin(batchAdd$).map(t => {
          return "cats" //TODO what is this?
        })
      }
    )
  }

  updateSupport(user: User, productId: string, bool: boolean) {
    let action = "";
    if (user.hasRole(productId)) {
      action = "Unassigned";
    } else {
      action = "Assigned";
    }
    return this.supportBookService.set(user.key, productId, bool)
      .pipe(
        tap(() => this.logService.addLog(user, "Support Changed", action + " " + productId))
      );
  }

  updateIncident(user: User, productId: string, amount: number) {
    return this.incidentBookService.set(user.key, productId, amount)
      .pipe(
        tap(() => {
          if (amount > user.getIncidentAmount(productId)) {
            this.logService.addLog(user, 'Incident Assigned', `${user.getIncidentAmount(productId)} to ${amount} in ${productId}`)
          } else {
            this.logService.addLog(user, 'Incident Unassigned', `${user.getIncidentAmount(productId)} to ${amount} in ${productId}`)
          }
        })
      );
  }

  resetRCC(user: User) {
    // console.log(user);
    // console.log("DEEP", Helper.deepCopy(user));
    let tmp = new User(user);
    tmp.currentQDays = 0;
    return this.userSetService.resetRCC(tmp);
  }

  updateQueueDays(user, amount) {
    let tmp = new User(user);
    tmp.currentQDays = amount;
    return this.updateUser(tmp).map(() => amount)
      .pipe(
        tap(() => {
          this.logService.addLog(user, "Queue Days Changed", user.currentQDays + " to " + tmp.currentQDays);
        }),
        catchError(
          err => this.handleError(err))
      );
  }

  getQM(): Observable<User> {
    return this.http.get(this.qmapi, this.httpOptions).map((r: any) => {
      return r.d.INUMBER;
    })
      .switchMap(iNumber => {
        return this.getUserByNumber(iNumber);
      });
  }

  setQM(iNumber: string) {
    return this.getUserByNumber(iNumber).switchMap(
      (user: User) => {
        // noinspection SpellCheckingInspection
        const body = {
          "INUMBER": user.iNumber
        };
        return this.http.put(this.qmapi, body, this.httpOptions);
      }
    );
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
      console.log(error);

      if(error.error == null){
        return new ErrorObservable(this.USER_NOT_FOUND);
      }
    }
    // // return an ErrorObservable with a user-facing error message
    // return new ErrorObservable(
    //   "Are you using Chrome? OR Database requires to be restarted =(");
    return new ErrorObservable("Something went wrong: " + error.message)
  }

}
