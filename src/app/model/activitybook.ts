import { EntryLog } from "./entrylog";
import { User } from "./user";

export class ActivityBook {
    private entryArray: Array<EntryLog>;
    constructor() {
        this.entryArray = new Array<EntryLog>();
    }
    getLogs() {
        return this.entryArray;
    }
    logIncident(user: User, type, amount) {
        this.entryArray.push(new EntryLog(
            amount + " Incident Assigned to " + user.name,
            user.getIncidentAmount(type) + " to " + (user.getIncidentAmount(type) + amount), ""));

    }
    logRole(user:User, role) {
        this.entryArray.push(new EntryLog(
            "Role Changed", user.name + " made " + role,""
        ));
    }

    logUser(user:User){
        this.entryArray.push(new EntryLog(
            "User Updated", user.name + "'s credential have been updated", ""
        ));
    }
}