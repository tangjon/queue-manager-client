export class User {
    iNumber: string;
    name:string;
    key: string;
    isAvailable: boolean;
    totalIncident: number;
    usagePercent: number;
    currentQDays: number;

    constructor(iNumber, name, key){
        this.iNumber = iNumber;
        this.name = name;
        this.key = key;
        this.isAvailable = true;
        this.totalIncident = 0;
        this.currentQDays = 0;
        this.usagePercent = 1.0;
    }
    checkAvailable(){
        return this.isAvailable
    }
    setAvailable(bool:boolean){
        this.isAvailable = bool
    }
    setUsage(percent){
        this.usagePercent = percent;
    }
}