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

  constructor(iNumber, firstName, lastName, isAvailable, currentQDays, iThreshold, usagePercent, objIncentCount, objSupportProducts) {
    this.iNumber = iNumber;
    this.usagePercent = usagePercent;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isAvailable = isAvailable;
    this.currentQDays = currentQDays;
    this.iThreshold = iThreshold;
    this.incidentCounts = objIncentCount;
    this.supportedProducts = this.setSupportProudct(objSupportProducts);
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
    Object.keys(this.incidentCounts).forEach(key => {
      count += this.incidentCounts[key];
    });
    return count;
  }


  getIncidentAmount(productShortName: string): number {
    return this.incidentCounts[productShortName];
  }

  getSupportedProducts(): Array<string> {
    let arr = [];
    Object.keys(this.supportedProducts).forEach(key => {
      if (this.supportedProducts[key] !== null) {
        arr.push(key)
      }
    });
    return arr;
  }

  hasRole(shortProductName: string): boolean {
    return this.supportedProducts[shortProductName];
  }

  getRoleList(): Array<string> {
    return [];
  }

  getAverageQDay(): any {
    let avg;
    if (this.usagePercent && this.currentQDays) {
      avg = this.getIncidentTotal() / (this.usagePercent * this.currentQDays);
    } else {
      avg = 0;
    }
    return parseFloat(avg).toFixed(3);
  }

  setSupportProudct(objSupportProducts) {
    if (objSupportProducts) {
      Object.keys(objSupportProducts).forEach(key => {
        if (objSupportProducts[key] == null) {
          objSupportProducts[key] = false;
        }
        else {
          objSupportProducts[key] = true;
        }
      });
      console.log(objSupportProducts)
    }
    return objSupportProducts;
  }

}

