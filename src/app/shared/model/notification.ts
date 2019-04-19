export class Notification {
  active: boolean;
  type: string;
  message: string;

  constructor(type, message, display) {
    this.active = display || false;
    this.message = message || "";
    this.type = `[${type.toUpperCase()}]` || "[SYSTEM INFO]";
  }

  isActive() {
    return this.active;
  }

  // toString() {
  //   return `[${this.type.toUpperCase()}] ${this.message}`
  // }

}

