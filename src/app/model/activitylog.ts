import { EntryLog } from "./entrylog";

export class ActivityLog {
    activityLog: Array<EntryLog>;
    constructor(){
    }

    addLog(item: EntryLog){
        this.activityLog.push();
    }

    getLogs(){
        return this.activityLog;
    }
}