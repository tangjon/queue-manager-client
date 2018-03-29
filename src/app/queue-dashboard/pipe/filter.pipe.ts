import {Pipe, PipeTransform} from '@angular/core';
import {User} from "../../shared/model/user";

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
