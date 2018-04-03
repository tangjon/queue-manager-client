import {Pipe, PipeTransform} from '@angular/core';
import {User} from "../../shared/model/user";
import {QueueControlComponent} from "../queue-control/queue-control.component";

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}


@Pipe({
  name: 'sortByAlpha',
  pure: false
})
export class SortByAlpha implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return [];
    return value.sort(
      function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
  }

}


@Pipe({
  name: 'sortByAVGQDay',
  pure: false
})

export class SortByAVGQDay implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return [];
    return value
      .sort(
        function (a, b) {
          if (a.getAverageQDay() < b.getAverageQDay()) {
            return -1;
          }
          if (a.getAverageQDay() > b.getAverageQDay()) {
            return 1;
          }
          return 0;
        });
  }

}


@Pipe({
  name: 'isAvailable',
  pure: false
})
export class IsAvailable implements PipeTransform {
  transform(value: any, component: string, availability: boolean): any {
    if (!value) return [];
    return value.filter((t: User) => {
      return t.supportBook.areas[component] == true && t.isAvailable === availability;
    });
  }
}

@Pipe({
  name: 'sortByPriority',
  pure: false
})
export class SortByPriority implements PipeTransform {
  private group(user:User[]){
    let object ={};
    user.forEach((user: User) => {
        if(!object[user.usagePercent.toString()]){ object[user.usagePercent.toString()] = [];}
        object[user.usagePercent.toString()].push(user);
    });
    let arr = [];
    let i = 0;
    Object.keys(object).forEach(key=>{
      arr[i] = object[key];
      i++;
    });
    return arr;
  }

  private rankGroup(group:any[], totalIncidents:number, membersAvailable: number){
    let usagePercent = group[0].usagePercent;
    return (1/(totalIncidents*usagePercent/membersAvailable)).toFixed(4);
  }

  transform(value: any, totalIncidents:number): any {
    if (!value) return [];
    this.group(value).forEach(group=>{
      console.log(group[0].usagePercent.toString() + ":",this.rankGroup(group, totalIncidents,value.length));
    });
    return value;
  }
}
