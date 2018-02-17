import { EntryLog } from "./entrylog";
import { User } from "./user";
import { QmUser } from "./qmuser";

export class ActivityBook {
    private entryArray: Array<EntryLog>;
    private qmUser: QmUser;
    constructor() {
        this.entryArray = new Array<EntryLog>();
        this.qmUser = new QmUser("DEFAULT-NAME")
    }
    getLogs() {
        return this.entryArray;
    }
    logIncident(user: User, type, amount) {
        this.entryArray.push(new EntryLog(
            amount + " Incident Assigned to " + user.name,
            user.getIncidentAmount(type) + " to " + (user.getIncidentAmount(type) + amount), this.qmUser.name));
    }
    logRole(user: User, role) {
        this.entryArray.push(new EntryLog(
            "Role Changed", user.name + " made " + role, this.qmUser.name
        ));
    }

    logUser(user: User) {
        this.entryArray.push(new EntryLog(
            "User Updated", user.name + "'s credential have been updated", this.qmUser.name
        ));
    }

    logEntry(user, type, description) {
        console.log(type);
        this.entryArray.push(new EntryLog(
            type, description, this.qmUser.name
        ))
    }

    getQmUser() {
        return this.qmUser;
    }

    setQM(name: string) {
        this.qmUser.setName(name);
    }
}