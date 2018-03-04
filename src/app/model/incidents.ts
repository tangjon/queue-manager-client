export class IncidentBook {
  areas = {};

  constructor() {
  }

  reset(): void {
    Object.keys(this.areas).forEach(key => this.areas[key] = 0)
  }

  update(update): void {
    Object.keys(update).forEach(key => {
      if (key !== '__metadata') {
        this.areas[key] = parseInt(update[key]) || 0;
      }
    });
  }
}
