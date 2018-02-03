import { Incidents } from "./incidents";
import { Role } from "./role";

export class User {
    iNumber: string;
    name:string;
    key: string;
    isAvailable: boolean;
    incidents: Incidents;
    usagePercent: number;
    currentQDays: number;
    role : Role

    constructor(iNumber, name, key){
        this.iNumber = iNumber;
        this.name = name;
        this.key = key;
        this.isAvailable = true;
        this.incidents = new Incidents();
        this.role = new Role();
        this.currentQDays = 0;
        this.usagePercent = 1.0;
    }
}

