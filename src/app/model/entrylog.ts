export class EntryLog {
    action: string;
    private queueManager: string;
    private date: Date;
    description: string;
    constructor(action, description, queueManager) {
        this.action = action;
        console.log(queueManager);
        this.queueManager = queueManager;
        this.description = description;
        this.date = new Date();
    }
    getManager(){
        return this.queueManager;
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