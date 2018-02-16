import { EntryLog } from "./entrylog";
import { User } from "./user";
import { QmuserService } from "../services/qmuser.service";

export class ActivityBook {
    private entryArray: Array<EntryLog>;
    public qmuser : QmuserService;
    constructor() {
        this.entryArray = new Array<EntryLog>();
        this.qmuser = new QmuserService();
    }
    getLogs() {
        return this.entryArray;
    }
    logIncident(user: User, type, amount) {
        console.log(this.qmuser.getName());
        this.entryArray.push(new EntryLog(
            amount + " Incident Assigned to " + user.name,
            user.getIncidentAmount(type) + " to " + (user.getIncidentAmount(type) + amount), this.qmuser.getName()));
    }
    logRole(user:User, role) {
        this.entryArray.push(new EntryLog(
            "Role Changed", user.name + " made " + role, this.qmuser.getName()
        ));
    }

    logUser(user:User){
        this.entryArray.push(new EntryLog(
            "User Updated", user.name + "'s credential have been updated", this.qmuser.getName()
        ));
    }
}