/*
* Modifying the model required changes to user related services as well
* */
export class User {
  iNumber: string;
  firstName: string;
  lastName: string;
  isAvailable: any;
  usagePercent: number;
  currentQDays: number;
  iThreshold: number;
  supportedProducts: object;
  incidentCounts: object;
  name: () => string;

  constructor(iNumber, firstName, lastName, isAvailable, currentQDays, iThreshold, usagePercent, objIncidentCount, objSupportProducts) {
    this.iNumber = iNumber;
    this.usagePercent = usagePercent;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isAvailable = isAvailable;
    this.currentQDays = currentQDays;
    this.iThreshold = iThreshold;
    this.incidentCounts = objIncidentCount;
    this.supportedProducts = this.setSupportProudct(objSupportProducts);
    this.name = function () {
      return `${firstName} ${lastName}`.trim();
    };
  }

  checkAvailability() {
    return this.isAvailable != 0;
  }

  getStatus(): string {
    if (this.isAvailable) {
      return "AVAILABLE";
    } else {
      return "BUSY";
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

  getSupportedProductList(): Array<string> {
    let arr = [];
    Object.keys(this.supportedProducts).forEach(key => {
      if (this.supportedProducts[key] != false) {
        arr.push(key);
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
        } else {
          objSupportProducts[key] = true;
        }
      });
    }
    return objSupportProducts;
  }

  // Call this for saving the meta body to database. The database expects this body
  generateMetaBody() {
    return {
      user_id: this.iNumber,
      first_name: this.firstName,
      last_name: this.lastName,
      is_available: this.isAvailable,
      usage_percent: this.usagePercent,
      current_q_days: this.currentQDays,
      incident_threshold: this.iThreshold
    };
  }

  static copy(user: User) {
    return new User(user.iNumber, user.firstName, user.lastName, user.isAvailable, user.currentQDays, user.iThreshold, user.usagePercent, user.incidentCounts, user.supportedProducts);
  }

}

