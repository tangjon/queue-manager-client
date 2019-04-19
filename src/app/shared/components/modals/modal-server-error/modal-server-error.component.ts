import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";

@Component({
  selector: 'app-modal-server-error',
  templateUrl: './modal-server-error.component.html',
  styleUrls: ['./modal-server-error.component.css']
})
export class ModalServerErrorComponent implements OnInit {

  public title = "Please Confirm";
  public message = "";
  public onCancel: Subject<any>;
  public onConfirm: Subject<any>;
  public onHide: Subject<any>;

  constructor(private _bsModalRef: BsModalRef) {

  }

  public ngOnInit(): void {
    this.onCancel = new Subject();
    this.onConfirm = new Subject();
    this.onHide = new Subject();
  }

  public confirm(): void {
    this.onConfirm.next();
    this._bsModalRef.hide();
  }

  public cancel(): void {
    this.onCancel.next();
    this._bsModalRef.hide();
  }

  public hide() {
    this.onHide.next();
    this._bsModalRef.hide();
  }
}
