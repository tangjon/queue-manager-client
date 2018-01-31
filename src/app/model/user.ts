export class User {
    iNumber: string;
    name:string;
    key: string;
    isAvailable: boolean;
    incidentAmount: number;

    constructor(iNumber, name, key){
        this.iNumber = iNumber;
        this.name = name;
        this.key = key;
        this.isAvailable = true;
        this.incidentAmount = 0;
    }
    checkAvailable(){
        return this.isAvailable
    }
    setAvailable(bool:boolean){
        this.isAvailable = bool
    }
}