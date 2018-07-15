import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {User} from '../shared/model/user';
import {BsModalService} from "ngx-bootstrap/modal";
import {ModalInterface} from "../shared/components/modals/modal-interface";
import {ModalInputComponent} from "../shared/components/modals/modal-input/modal-input.component";
import {AngularFireAuth} from "angularfire2/auth";
import {ModalServerErrorComponent} from "../shared/components/modals/modal-server-error/modal-server-error.component";
import {environment} from "../../environments/environment";

@Injectable()
export class LoginService {
  // Component Variables
  public KEY_CACHE_INUMBER = environment.KEY_CACHE_INUMBER;
  public user: User;

  constructor(private userService: UserService, private modalService: BsModalService, public afAuth: AngularFireAuth) {

  }

  signIn(iNumber) {
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
    bsModalRef.content.onConfirm.subscribe((input: string) => this.signIn(input.toLowerCase()));
    bsModalRef.content.onCancel.subscribe(() => this.signIn(null));
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
