import * as moment from 'moment';
import {unitOfTime} from "moment";

export class Helper {

  static deepCopy(obj){
    return Object.assign({}, obj)
  }

  static flatCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  static dateInRange(date:Date, start:Date, end:Date){
    return moment(date).isBetween(start, end);
  }

  static dateWithin(date:Date, range: unitOfTime.StartOf){
    return moment(date).isBetween(moment().startOf(range), moment().endOf(range));
  }
}
