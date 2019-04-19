import * as moment from 'moment';
import {unitOfTime} from 'moment';
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

export class Helper {

  static deepCopy(obj) {
    return Object.assign({}, obj);
  }

  static flatCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  static dateInRange(date: Date, start: Date, end: Date) {
    return moment(date).isBetween(start, end);
  }

  static dateWithin(date: Date, range: unitOfTime.StartOf): boolean {
    return moment(date).isBetween(moment().startOf(range), moment().endOf(range));
  }

  static handleError(error?: HttpErrorResponse, message?: string) {
    console.error(error);
    // DEFAULT ERROR MESSAGE
    if (message.length === 0) {
      message = "Something went wrong";
    }
    // DATA BASE IS DOWN
    if (error.status === 0) {
      message = "DATABASE IS DOWN :: " + message;
    }
    if (error.name === "HttpErrorResponse") {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
      return throwError({
        "status": error.status,
        "message": `${message} : ${error.error.message}`
      });
    } else {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.message);
      return throwError({
        "status": error.status,
        "message": `${message} : ${error.message}`
      });
    }

  }

  static sortAlpha(arr) {
    arr.sort(function (b, a) {
      if (a > b) {
        return -1;
      }
      if (a < b) {
        return 1;
      }
      return 0;
    });
    return arr;
  }
}
