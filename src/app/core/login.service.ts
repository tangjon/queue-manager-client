import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {User} from '../shared/model/user';
import {BsModalService} from "ngx-bootstrap/modal";
import {ModalInterface} from "../shared/components/modals/modal-interface";
import {ModalInputComponent} from "../shared/components/modals/modal-input/modal-input.component";
import {AngularFireAuth} from "angularfire2/auth";
import {ModalServerErrorComponent} from "../shared/components/modals/modal-server-error/modal-server-error.component";
import {environment} from "../../environments/environment";
import {Helper} from "../shared/helper/helper";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class LoginService {
  // Component Variables
  public KEY_CACHE_INUMBER = environment.KEY_CACHE_INUMBER;
  public user: User;

  public api = environment.api + "/auth";

  public authToken;

  constructor(public http: HttpClient, private userService: UserService, private modalService: BsModalService, public afAuth: AngularFireAuth) {

  }

  authenticateWithUserNamePassword(username, password) {
    username = username.trim();
    password = password.trim();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "Basic " + btoa(`${username}:${password}`)
      })
    };
    return this.http.get(this.api, httpOptions).pipe(
      catchError(e => Helper.handleError(e, "Failed to Authenticate"))
    ).pipe(
      tap(() => this.authToken = btoa(`${username}:${password}`))
    )
  }

  authenticatedWithBasicToken(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "Basic " + this.authToken
      })
    };
    return this.http.get(this.api, httpOptions).pipe(
      catchError(e => Helper.handleError(e, "Failed to Authenticate"))
    )
  }

  isAuthenticated() {
    return this.authenticatedWithBasicToken(this.authToken).map(() => true);
  }




  authenticateWithFirebase(username, password) {
    // Todo this is work around
    username += "@scout33.org";
    return this.afAuth.auth.signInWithEmailAndPassword(username, password)
  }

  logonWithINumber(iNumber) {
    if (!iNumber) {
      iNumber = "empty"
    }
    this.userService.getUserByNumber(iNumber.toLowerCase()).subscribe((user: User) => {
        this.user = user;
        localStorage[this.KEY_CACHE_INUMBER] = this.user.iNumber;
      }, (err: any) => {
        // SERVER IS DOWN
        if (err.status === 0) {
          this.showDataBaseDown(err)
        } else {
          this.promptINumber();
        }
      }
    )
  }

  promptINumber() {
    let bsModalRef: ModalInterface = this.modalService.show(ModalInputComponent, {
      animated: true,
      keyboard: false,
      focus: true,
      ignoreBackdropClick: true
    });
    bsModalRef.content.title = "Please enter your INUMBER";
    bsModalRef.content.message = "This will help the tool identify who you are. ie i123456";
    bsModalRef.content.onConfirm.subscribe((input: string) => this.logonWithINumber(input.toLowerCase()));
    bsModalRef.content.onCancel.subscribe(() => this.logonWithINumber(null));
    bsModalRef.content.onHide.subscribe(() => this.signOut());
  }

  showDataBaseDown(err) {
    // This is all dialog for server error
    // TODO RE-ENABLE AFTER SQL INTEGRATION
    let bsModalRef: ModalInterface = this.modalService.show(ModalServerErrorComponent, {
      animated: true,
      keyboard: false,
      focus: true,
      ignoreBackdropClick: true
    });
    bsModalRef.content.title = "Well this is embarrassing...";
    bsModalRef.content.message = err.message;
    bsModalRef.content.onConfirm.subscribe(() => location.reload());
    bsModalRef.content.onHide.subscribe(() => this.signOut());
  }

  signOut() {
    localStorage.clear();
    this.user = null;
    this.afAuth.auth.signOut();
  }
}
