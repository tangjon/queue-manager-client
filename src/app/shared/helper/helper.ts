export class Helper {

  static deepCopy(obj){
    return Object.assign({}, obj)
  }

  static flatCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

}
