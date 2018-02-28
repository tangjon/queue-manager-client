import {QmUser} from './qmuser';

export class EntryLog {
  action: string;
  private logger: string;
  date: Date;
  description: string;
  userName: string;
  iNumber: string;
  pushID: string;

  constructor(userName, iNumber, action, description, logger: string, pushID: string) {
    this.action = action;
    this.logger = logger;
    this.description = description;
    this.iNumber = iNumber;
    this.userName = userName;
    this.pushID = pushID;
    this.date = new Date();
  }

  getLogger(): string {
    return this.logger;
  }

  getTimeFormatted(): string {
    return this.date.getHours().toString() + ':'
      + this.date.getMinutes().toString() + ':'
      + this.date.getSeconds().toString();
  }

  getDateFormatted(): string {
    const monthNames = [
      '1', '2', '3',
      '4', '5', '6', '7',
      '8', '9', '1',
      '11', '12'
    ];
    const month = monthNames[this.date.getMonth()];
    const day = this.date.getDate();
    const year = this.date.getFullYear();
    return `${month}/${day}/${year}`;

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
