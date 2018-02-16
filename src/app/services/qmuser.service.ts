import { Injectable } from '@angular/core';
import { QmUser } from '../model/qmuser';

@Injectable()
export class QmuserService {
  qmUser: QmUser;
  constructor() {
    this.qmUser = new QmUser("DEFAULT")
  }

  getUser() {
    return this.qmUser;
  }
  changeUser(newName) {
    
  }
}
