import * as moment from 'moment';
import {Detail} from "./detail";

// This comes from the database
export enum ActiondId {
  CUSTOM_MESSAGE = 1,
  INCIDENT_ASSIGNED = 2,
  INCIDENT_UNASSIGNED = 3,
  AVAILABILITY_CHANGED = 4,
  QUEUE_DAYS_CHANGED = 5
}

export class ActionEntryLog {
  loggerInumber: string;
  affectedInumber: string;
  actionId: ActiondId;
  defaultDescription: string;
  detail: Detail;
  timestamp: Date;

  constructor(options) {
    this.actionId = options.actionId;
    this.loggerInumber = options.loggerInumber;
    this.defaultDescription = options.defaultDescription;
    this.affectedInumber = options.affectedInumber;
    this.timestamp = options.timestamp ? new Date(options.timestamp) : new Date();
    this.detail = options.detail || new Detail("","","");
  }

  getDescription() {
      return this.defaultDescription
  }

  getLogger(): string {
    return this.loggerInumber;
  }

  getTimeFormatted(): string {
    return moment(this.timestamp).format("kk:mm:ss")
  }

  getDateFormatted(): string {
    return moment(this.timestamp).format('MM/DD/YYYY')
  }

  getSummary(): string {
    return '[' + this.getDescription() + ']' + ' : ' + this.affectedInumber + '(' + this.affectedInumber + ')' + ' : ' + this.detail.toString()
  }

  getFullDate(): Date {
    return this.timestamp;
  }

  setDate(date: Date): void {
    this.timestamp = date;
  }

  setDateFromString(date: string): void {
    date = date.replace(/['"]+/g, '');
    this.timestamp = new Date(date);
  }

  generatePostBody(){
    return {
      "logger_id" : this.loggerInumber,
      "affected_user_id" : this.affectedInumber,
      "action_id" : this.actionId,
      "detail": this.detail.toString()
    }
  }
}
