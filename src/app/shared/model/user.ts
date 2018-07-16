/*
* Modifying the model required changes to user related services as well
* */
export class User {
  iNumber: string;
  firstName: string;
  lastName: string;
  isAvailable: boolean;
  usagePercent: number;
  currentQDays: number;
  iThreshold: number;
  supportedProducts: object;
  incidentCounts: object;
  name: () => string;

  constructor(iNumber, firstName, lastName, isAvailable, currentQDays, iThreshold, objIncentCount, objSupportProducts) {
    this.iNumber = iNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isAvailable = isAvailable;
    this.currentQDays = currentQDays;
    this.iThreshold = iThreshold;
    this.incidentCounts = objIncentCount;
    this.supportedProducts= objSupportProducts;
    this.name = function () {
      return `${firstName} ${lastName}`
    }
  }

  getStatus(): string {
    if (this.isAvailable) {
      return "OK"
    } else {
      return "BUSY"
    }
  }

  setStatus(bool: boolean): void {
    this.isAvailable = bool;
  }

  getIncidentTotal(): number {
    let count = 0;
    Object.keys(this.incidentCounts).forEach(key=>{
      count += this.incidentCounts[key];
    });
    return count;
  }

  getSupportedProducts(): object {
    return this.supportedProducts;
  }

  hasRole(role: string): boolean {
    return true
  }

  getRoleList(): Array<string> {
    return [];
  }

  getIncidentAmount(type: string): number {
    return 0;
  }

  getAverageQDay(): any {
    var avg;
    if (this.usagePercent && this.currentQDays) {
      avg = this.getIncidentTotal() / (this.usagePercent * this.currentQDays);
    } else {
      avg = 0;
    }
    return parseFloat(avg).toFixed(3);
  }
}

