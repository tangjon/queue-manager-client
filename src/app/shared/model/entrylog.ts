import * as moment from 'moment';

export class EntryLog {
  action: string;
  private logger: string;
  date: Date;
  description: string;
  userName: string;
  iNumber: string;
  KEY: string;

  constructor(userName, iNumber, action, description, logger: string, key: string) {
    this.action = action;
    this.logger = logger;
    this.description = description;
    this.iNumber = iNumber;
    this.userName = userName;
    this.KEY = key;
    this.date = new Date();
  }

  getLogger(): string {
    return this.logger;
  }

  getTimeFormatted(): string {
    return moment(this.date).format("kk:mm:ss")
  }

  getDateFormatted(): string {
    return moment(this.date).format('MM/DD/YYYY')
  }

  getSummary(): string {
    return '[' + this.action + ']' + ' : ' + this.userName + '(' + this.iNumber + ')' + ' : ' + this.description;
  }

  getFullDate(): Date {
    return this.date;
  }

  setDate(date: Date): void {
    this.date = date;
  }

  setDateFromString(date: string): void {
    date = date.replace(/['"]+/g, '');
    this.date = new Date(date);
  }
}
