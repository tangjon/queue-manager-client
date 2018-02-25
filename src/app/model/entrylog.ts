import { QmUser } from "./qmuser";

export class EntryLog {
    action: string;
    private logger: string;
    private date: Date;
    description: string;
    userName: string;
    iNumber: string;
    pushID: string;
    constructor(userName, iNumber, action, description, logger: string, pushID:string) {
        this.action = action;
        this.logger = logger;
        this.description = description;
        this.iNumber = iNumber;
        this.userName = userName;
        this.pushID = pushID;
        this.date = new Date();
    }
    getLogger() : string {
        return this.logger;
    }

    getTimeFormatted() : string {
        return this.date.getHours().toString() + ':'
            + this.date.getMinutes().toString() + ':'
            + this.date.getSeconds().toString();
    }

    getDateFormatted() : string {
        let month = this.date.getMonth();
        let day = this.date.getDay();
        let year = this.date.getFullYear();
        return " " + month + '/' + day + '/' + year;
    }

    getSummary() : string {
        let string = '[' + this.action + ']' + " : " + this.userName + '(' + this.iNumber + ')' + " : " + this.description;
        return string;
    }

    getFullDate() : Date{
        return this.date;
    }

    setDate(date: Date) : void{
        this.date = date;
    }

    setDateFromString(date: string) : void{
        date = date.replace(/['"]+/g, '');
        this.date = new Date(date);
    }
}