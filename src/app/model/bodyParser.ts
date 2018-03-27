export class BodyParser {

  static parseBody(body){
    const { __metadata, ...newObject } = body.d;
    return newObject;
  }
}
