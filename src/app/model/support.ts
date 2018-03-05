export class Support {
  areas = {};

  // data = {};
  constructor() {
  }

  getSupportAreas(): string[] {
    return [];
  }


  update(update) {
    Object.keys(update).forEach(key => {
      this.areas[key] = JSON.parse(update[key]) || false;
    });
  }

  toJSONDBString() {
    let sObj = {};
    Object.keys(this.areas).forEach(key => {
      sObj[key] = this.areas[key].toString();
    });
    return sObj;
  }
}
