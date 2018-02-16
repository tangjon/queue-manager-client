import { Injectable } from '@angular/core';
import { ActivityBook } from '../model/activitybook';
import { EntryLog } from '../model/entrylog';
import { User } from '../model/user';
import { Role } from '../model/role';

@Injectable()
export class ActivityBookService {

  private activityBook: ActivityBook = new ActivityBook();

  constructor() {

  }

  getBook() {
    return this.activityBook;
  }

  getManager() {
    return this.activityBook.getQmUser();
  }
  updateManager(name:string){
    this.activityBook.setQM(name);
  }

  logIncident(user: User, type: string, amount: number) {
    this.activityBook.logIncident(user, type, amount);
  }

  logRole(user:User, role:Role){
    this.activityBook.logRole(user, role);
  }



}
