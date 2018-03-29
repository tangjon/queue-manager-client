import {Injectable} from '@angular/core';
import {User} from '../shared/model/user';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {UserSetService} from './user-set.service';
import {LogService} from './log.service';
import {environment} from "../../environments/environment";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {IncidentBookService} from "./incident-book.service";
import {SupportBookService} from "./support-book.service";
import {ProductService} from "./product.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  private qmapi: string = environment.apiUrl + "qm('current')";
  private userSource = new BehaviorSubject<User[]>([]);

  constructor(public db: AngularFireDatabase,
              public http: HttpClient,
              public userSetService: UserSetService,
              public logService: LogService,
              public incidentBookService: IncidentBookService,
              public supportBookService: SupportBookService,
              public productService: ProductService) {

    // this.db.object('queue-last-change').valueChanges().subscribe(r => {
    //     console.log(r);
    // });
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


  getUser(iNumber: string) {
    return this.getUsers().map((data: User[]) => {
      // filter array
      const user = data.find((user: User) => {
        return user.iNumber == iNumber;
      });
      if (!user) {
        throw new Error("User Not Found");
      }
      return user;
    });
  }

  getUserv2(key) {
    return forkJoin([this.userSetService.getUserSet({key: key}),
      this.supportBookService.get(key),
      this.incidentBookService.get(key)
    ]).map(data => {
      const [userSet, incidentBook, supportBook] = data;
      let user = new User(userSet);
      user.incidentBook.set(incidentBook);
      user.supportBook.set(supportBook);
      console.log(user);
      return user;
    })
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
        tap(() => this.logService.addLog(user, "Availability Changed", `Switched to ${user.getStatus()}`)
        ),
        tap(() => {
          this.db.object('queue-last-change').set({key: user.key, action: "Availability Changed", value: bool});
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
          batchAdd$.push(this.supportBookService.addComponet(user.key, productId));
          batchAdd$.push(this.incidentBookService.addComponet(user.key, productId));
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
          return "cats"
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
    return this.supportBookService.setSupport(user.key, productId, bool)
      .pipe(
        tap(() => this.logService.addLog(user, "SupportBook Changed", action + " " + productId))
      );
  }

  updateIncident(user: User, productId: string, amount: number) {
    let aString = "";
    if (user.getIncidentAmount(productId) < amount) {
      aString = "Incident Assigned";
    } else {
      aString = "Incident Unassigned";
    }

    return this.incidentBookService.setCount(user.key, productId, amount)
      .pipe(
        tap(() => this.logService.addLog(user, aString, user.getIncidentAmount(productId) + " to " + amount + " in " + productId)),
        tap(() => {
          this.db.object('queue-last-change').set({
            key: user.key,
            action: "Incident Assigned",
            productId: productId,
            value: amount
          });
        })
      );
  }

  resetRCC(user: User) {
    return this.userSetService.resetRCC(user);
  }

  updateQueueDays(user, amount) {
    const tmp = new User(user);
    tmp.currentQDays = amount;
    return this.updateUser(tmp).map(() => amount)
      .pipe(
        tap(() => {
            console.log("NOT SUPPOSED TO HAPPEN");
            this.logService.addLog(user, "Queue Days Changed", user.currentQDays + " to " + tmp.currentQDays);
          },
          () => console.log("ERROR!"),
          () => console.log("COMPLETED!!!")
        )
      );
  }

  getQM(): Observable<User> {
    return this.http.get(this.qmapi, this.httpOptions).map((r: any) => {
      return r.d.INUMBER;
    })
      .switchMap(iNumber => {
        return this.getUser(iNumber);
      });
  }

  setQM(iNumber: string) {
    return this.getUser(iNumber.toLowerCase()).switchMap(
      (user: User) => {
        // noinspection SpellCheckingInspection
        const body = {
          "INUMBER": user.iNumber
        };
        return this.http.put(this.qmapi, body, this.httpOptions);
      }
    );
  }

  private handleError(error: HttpErrorResponse) {
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
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      "Are you using Chrome? OR Database requires to be restarted =(");
  }

}
