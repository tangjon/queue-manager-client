export class BodyParser {

  static parseBody(body) {
    if (body.d.results) {
      return this.parseBodyResult(body);
    }
    if (body.d) {
      const {__metadata, ...newObject} = body.d;
      return newObject;
    }
  }

  private static parseBodyResult(body) {
    return body.d.results.map(el => {
      const {__metadata, ...newObject} = el;
      return newObject;
    });
  }
}
