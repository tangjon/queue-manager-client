export class EntryLog {
    pageName: string;
    action: string;
    date: Date;
    description: string;
    constructor(action, description, pageName) {
        this.action = action;
        this.pageName = pageName;
        this.description = description;
        this.date = new Date();
    }
}