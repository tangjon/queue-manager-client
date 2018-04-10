import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {User} from '../shared/model/user';
import {BsModalService} from "ngx-bootstrap/modal";
import {ModalInterface} from "../shared/components/modals/modal-interface";
import {ModalInputComponent} from "../shared/components/modals/modal-input/modal-input.component";
import {AngularFireAuth} from "angularfire2/auth";
import {ModalServerErrorComponent} from "../shared/components/modals/modal-server-error/modal-server-error.component";

@Injectable()
export class LoginService {
  // noinspection SpellCheckingInspection
  CACHE_KEY = "MYINUMBER";
  user: User;

  constructor(public userService: UserService, private modalService: BsModalService, public afAuth: AngularFireAuth) {

  }

  signIn(iNumber) {
    if (!iNumber) {
      iNumber = "empty"
    }
    this.userService.getUserByNumber(iNumber.toLowerCase()).subscribe((user: User) => {
        this.user = user;
        localStorage[this.CACHE_KEY] = this.user.iNumber;
      },
      (err) => {
        if (err === this.userService.USER_NOT_FOUND && iNumber != "admin") {
          // This is all dialog for seconday login
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
        } else {
          // This is all dialog for server error
          let bsModalRef: ModalInterface = this.modalService.show(ModalServerErrorComponent, {
            animated: true,
            keyboard: false,
            focus: true,
            ignoreBackdropClick: true
          });
          bsModalRef.content.title = "Well this is embarrassing...";
          bsModalRef.content.message = err;
          bsModalRef.content.onConfirm.subscribe(()=> location.reload());
          bsModalRef.content.onHide.subscribe(()=> this.signOut());

        }
      }
    )
  }

  signOut() {
    localStorage[this.CACHE_KEY] = "";
    this.afAuth.auth.signOut();
  }

  getUser() {
    return this.user;
  }
}
