import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";

@Component({
  selector: 'app-modal-input',
  templateUrl: './modal-input.component.html',
  styleUrls: ['./modal-input.component.css']
})
export class ModalInputComponent implements OnInit{

  public title = "Please Confirm";
  public message = "";
  public onCancel: Subject<boolean>;
  public onConfirm: Subject<boolean>;
  public onHide: Subject<boolean>;

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

  public hide(){
    this.onHide.next();
    this._bsModalRef.hide();
  }

}
