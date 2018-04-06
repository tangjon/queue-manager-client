import {Subject} from "rxjs/Subject";

export interface ModalInterface {
  content?: {
    title: string,
    message: string,
    onConfirm: Subject<any>,
    onCancel: Subject<any>,
    onHide: Subject<any>
  }
}
