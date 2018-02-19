import { QmUser } from "./qmuser";

export class EntryLog {
    action: string;
    private assignedQM: QmUser;
    private date: Date;
    description: string;
    userName: string;
    iNumber: string;
    pushID: string;
    constructor(userName, iNumber, action, description, queueManager: QmUser, pushID:string) {
        this.action = action;
        this.assignedQM = queueManager;
        this.description = description;
        this.iNumber = iNumber;
        this.userName = userName;
        this.pushID = pushID;
        this.date = new Date();
    }
    getManager() : QmUser {
        return this.assignedQM;
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