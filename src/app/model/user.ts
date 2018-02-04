import { Incidents } from "./incidents";
import { Role } from "./role";

export class User {
    iNumber: string;
    name: string;
    key: string;
    isAvailable: boolean;
    incidents: Incidents;
    usagePercent: number;
    currentQDays: number;
    role: Role

    constructor(user) {
        this.iNumber = user.iNumber;
        this.name = user.name;
        this.key = user.key;
        this.isAvailable = user.isAvailable || true;
        this.incidents = user.incidents || new Incidents();
        this.role = user.role || new Role();
        this.currentQDays = user.currentQDays || 0;
        this.usagePercent = user.usagePercent || 1.0;
    }

    getIncidentTotal() {
        var total = 0;
        console.log(this.incidents)
        for (var key in this.incidents) {
            total += parseInt(this.incidents[key])
        }
        return total;
    }

    getUserRole() {
        let list: Array<string> = [];
        Object.keys(this.role).forEach(el => {
            if (this.role[el] == true) {
                list.push(el);
            }
        })
        return list;
    }
    getRoleList() {
        let list: Array<string> = [];
        Object.keys(this.role).forEach(el => {
            list.push(el);
        })
        return list;
    }

    hasRole(role:string) {
        let ref = this.role[role];
        return ref;
    }
}

