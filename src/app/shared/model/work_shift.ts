export class WorkShift {
  location: string;
  private start: Date;
  private end: Date;

  constructor(location: string, start: Date, end: Date) {
    this.start = start;
    this.end = end;
    this.location = location;
  }

  isOnline() {
    let today = new Date();
    let tMinutes = this.convertToMinutes(today.getHours()) + today.getMinutes();
    let sMinutes = this.convertToMinutes(this.start.getHours()) + this.start.getMinutes();
    let eMinutes = this.convertToMinutes(this.end.getHours()) + this.end.getMinutes();
    return sMinutes <= tMinutes && tMinutes <= eMinutes;

  }

  getStatus() {
    if (this.isOnline()) {
      return "Online";
    } else {
      return "Offline";
    }
  }

  convertToMinutes(hours) {
    return hours * 60;
  }

}
