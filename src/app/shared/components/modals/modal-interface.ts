import {Subject} from "rxjs";

export interface ModalInterface {
  content?: {
    title: string,
    message: string,
    onConfirm: Subject<any>,
    onCancel: Subject<any>,
    onHide: Subject<any>
  }
}
