import { EntryLog } from "./entrylog";
import { User } from "./user";
import { QmUser } from "./qmuser";

export class ActivityBook {
    private entryArray: Array<EntryLog>;
    private activeQM: QmUser;
    constructor() {
        this.entryArray = new Array<EntryLog>();
        this.activeQM = new QmUser("DEFAULT");
    }
    
    getLogs(): Array<EntryLog> {
        return this.entryArray;
    }

    addEntry(entry: EntryLog): void {
        this.entryArray.push(entry)
    }
    
    removeEntry(pushID: string): void {
        let i = this.entryArray.findIndex((t: EntryLog) => {
            return t.pushID == pushID;
        });
        this.entryArray.splice(i, 1);
    }

    getActiveQM(): QmUser {
        return this.activeQM;
    }

    setActiveQM(name: string): void {
        this.activeQM.setName(name);
    }


}