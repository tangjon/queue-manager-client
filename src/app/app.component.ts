import {Component} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalConfirmComponent } from "./shared/components/modal-confirm/modal-confirm.component";
import {ModalInfoComponent} from "./shared/components/modal-info/modal-info.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Observable<any[]>;
  errorMessage: string;
  INITIALIZED = false;
  bsModalRef: BsModalRef;
  constructor(db: AngularFireDatabase, public afAuth: AngularFireAuth,private modalService: BsModalService) {

    db.object('system-refresh').valueChanges().subscribe(()=>{
      if(this.INITIALIZED){
        if(window.confirm("QMCD is requesting to refresh the browser. Please click ok for full functionality")){
          location.reload();
        }
      } else {
        this.INITIALIZED = true;
      }
    })
    // window.onscroll = this.testScroll;
  }

  openConfirmDialog() {
    this.bsModalRef = this.modalService.show(ModalConfirmComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);
    })
  }

  // testScroll(ev) {
  //   console.log(window.pageYOffset);
  //   if (window.pageYOffset > 200) { console.log('User has scrolled at least 400 px!'); }
  // }
}
