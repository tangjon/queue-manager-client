import { Incidents } from "./incidents";

export class User {
    iNumber: string;
    name:string;
    key: string;
    isAvailable: boolean;
    incidents: Incidents;
    usagePercent: number;
    currentQDays: number;

    constructor(iNumber, name, key){
        this.iNumber = iNumber;
        this.name = name;
        this.key = key;
        this.isAvailable = true;
        this.incidents = new Incidents();
        this.currentQDays = 0;
        this.usagePercent = 1.0;
    }
}

