export class IncidentBook {
  data = {};

  constructor() {
  }

  addArea(area: string) {
    this.data[area] = 0;
  }

  updateArea(area: string, amount: number) {
    this.data[area] = amount;
  }

  getData() {
    return this.data;
  }
  reset(): void {
    Object.keys(this.data).forEach(key => this.data[key] = 0)
  }

  set(data): void {
    Object.keys(data).forEach(key => {
      if (key !== '__metadata') {
        this.data[key] = parseInt(data[key]) || 0;
      }
    });
  }
}
