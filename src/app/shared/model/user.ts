import {IncidentBook} from "./incident_book";
import {SupportBook} from "./support_book";

/*
* Modifying the model required changes to user related services as well
* */
export class User {
  iNumber: string;
  name: string;
  key: string;
  isAvailable: boolean;
  incidentBook: IncidentBook;
  usagePercent: number;
  currentQDays: number;
  supportBook: SupportBook;
  i_threshold: number;
  // Needs to be able to read user-set object from db
  constructor(user) {
    this.iNumber = user.iNumber || user.INUMBER;
    this.name = user.name || user.NAME;
    this.key = user.key || user.KEY;
    this.isAvailable = user.isAvailable || false;
    if (user.ISAVAILABLE) {
      this.isAvailable = JSON.parse(user.ISAVAILABLE)
    }
    this.incidentBook = user.incidentBook || new IncidentBook();
    this.supportBook = user.supportBook || new SupportBook();
    this.currentQDays = user.currentQDays || parseFloat(user.CURRENTQDAYS) || 0; // this is passed as a string from the server .... idk why
    this.usagePercent = user.usagePercent || parseFloat(user.USAGEPERCENT) || 1.0;
    this.i_threshold = user.i_threshold || parseInt(user.I_THRESHOLD) || 3
  }

  getStatus(): string {
    if (this.isAvailable) {
      return "OK"
    } else {
      return "BUSY"
    }
  }

  setStatus(bool: boolean): void {
    this.isAvailable = bool;
  }

  getIncidentTotal(): number {
    let total = 0;
    Object.keys(this.incidentBook.data).forEach(key => {
      total += this.getIncidentAmount(key);
    });
    return total;
  }

  ///TODO THIS IS BROKEN!
  getUserRoles(): Array<string> {
    let list: Array<string> = [];
    Object.keys(this.supportBook).forEach(el => {
      if (this.supportBook[el] == true) {
        list.push(el);
      }
    });
    return list;
  }

  hasRole(role: string): boolean {
    let ref = this.supportBook.areas[role];
    return ref;
  }

  getRoleList(): Array<string> {
    let list: Array<string> = [];
    Object.keys(this.supportBook).forEach(el => {
      list.push(el);
    });
    return list;
  }

  getIncidentAmount(type: string): number {
    // console.log(this.incidentBook[type])
    return this.incidentBook.data[type]
  }

  getAverageQDay(): any {
    var avg;
    if (this.usagePercent && this.currentQDays) {
      avg = this.getIncidentTotal() / (this.usagePercent * this.currentQDays);
    } else {
      avg = 0;
    }
    return parseFloat(avg).toFixed(3);
  }
}

