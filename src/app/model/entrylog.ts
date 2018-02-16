export class EntryLog {
    pageName: string;
    action: string;
    private date: Date;
    description: string;
    constructor(action, description, pageName) {
        this.action = action;
        this.pageName = pageName;
        this.description = description;
        this.date = new Date();
    }

    getTime(){
        return this.date.getHours().toString() + ':' 
        + this.date.getMinutes().toString() + ':'
        + this.date.getSeconds().toString();
    }

    getDate(){
        let month = this.date.getMonth();
        let day = this.date.getDay();
        let year = this.date.getFullYear();
        return " " + month + '/' + day + '/' + year;
    }
}