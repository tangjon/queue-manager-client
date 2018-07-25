import * as moment from 'moment';

// This comes from the database
enum ActiondId {
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
  description: string;
  customDescription: string;
  timestamp: Date;

  constructor(options) {
    this.actionId = options.actionId;
    this.loggerInumber = options.loggerInumber;
    this.description = options.description;
    this.affectedInumber = options.affectedInumber;
    this.timestamp = new Date(options.timestamp) || new Date();
  }

  getDescription() {
    if(this.actionId === ActiondId.CUSTOM_MESSAGE){
      return this.customDescription
    } else{
      return this.description
    }
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
    return '[' + this.getDescription() + ']' + ' : ' + this.affectedInumber + '(' + this.affectedInumber + ')' + ' : ' + "uhh";
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
}
