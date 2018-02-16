import { Injectable } from '@angular/core';

@Injectable()
export class QmuserService {
  private name : string;
  constructor() { 
    this.name = "default"
  }

  getUser(){
    return this.name;
  }
  changeUser(newName){
    this.name = newName;
  }
  getName(){
    return this.name;
  }
}
