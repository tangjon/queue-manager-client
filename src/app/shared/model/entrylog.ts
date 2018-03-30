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
    let hours = this.date.getHours().toString();
    let minutes = this.date.getMinutes().toString();
    let seconds = this.date.getSeconds().toString();
    minutes = minutes.length < 2 ? '0' + minutes : minutes;
    seconds = seconds.length < 2 ? '0' + seconds : seconds;
    return moment(this.date).format("dddd, MMMM Do YYYY, hh:mm:ss a")


    // return `${hours}:${minutes}:${seconds}`
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
