import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable()
export class UserService {

  constructor() { }

  getIncidentTotal(user: User) {
    var total = 0;
    for (var key in user.incidents) {
      total += parseInt(user.incidents[key])
    }
    return total;
  }

  getRole(user: User) {
    let role = user["role"];
    let list: Array<string> = [];
    Object.keys(role).forEach(el => {
      if (role[el] == true) {
        list.push(el);
      }
    })
    return list;
  }
}
