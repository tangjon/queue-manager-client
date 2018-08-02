
import {map, catchError, tap} from 'rxjs/operators';
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

@Injectable()
export class LoginService {


  // Component Variables
  public KEY_CACHE_AUTH_TOKEN = "AUTH_TOKEN";
  public KEY_CACHE_INUMBER = environment.KEY_CACHE_INUMBER;
  public user: User;

  public api = environment.api + "/auth";

  public authToken;

  public hasAuth = false;


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
      tap(() => {
        this.setCachedToken(btoa(`${username}:${password}`));
        // this.authToken = btoa(`${username}:${password}`);
        this.hasAuth = true;
      }),
      catchError(e => Helper.handleError(e, "Failed to Authenticate"))
    )
  }

  authenticatedWithBasicToken(token?: string) {
    if (!token) {
      token = this.getCachedToken();
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "Basic " + token
      })
    };
    return this.http.get(this.api, httpOptions).pipe(
      tap(() => this.hasAuth = true),
      catchError(e => Helper.handleError(e, "Failed to Authenticate with token"))
    )
  }

  isAuthenticated() {
    return this.authenticatedWithBasicToken(this.getCachedToken()).pipe(map(() => true));
  }

  getCachedToken() {
    return localStorage.getItem(this.KEY_CACHE_AUTH_TOKEN)
  }

  setCachedToken(token) {
    localStorage.setItem(this.KEY_CACHE_AUTH_TOKEN, token)
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
    this.hasAuth = false;
    localStorage.clear();
    this.user = null;
    this.afAuth.auth.signOut();
  }
}
