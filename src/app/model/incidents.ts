export class Incidents {
    MS: number;
    SA: number;
    SM: number;
    FC_EA_IC_FIM: number;
    DSM: number;
    PCM: number;
    RTC: number;
    LOD_ANA_PL: number;
    NW: number;
    constructor() {
        this.NW = 0;
        this.MS = 0;
        this.PCM = 0;
        this.SA = 0;
        this.SM = 0;
        this.FC_EA_IC_FIM = 0;
        this.DSM = 0;
        this.RTC = 0;
        this.LOD_ANA_PL = 0;
    }
    reset(): void {
        let object = new Incidents();
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                object[key] = 0;
            }
        }
    }
    // TODO REVERSE THIS.... THIS VERY WRONG
    update(update): void {
        this.NW = 0 || update.NW;
        this.MS = 0 || update.MS;
        this.PCM = 0 || update.PCM;
        this.SA = 0 || update.SA;
        this.SM = 0 || update.SM;
        this.FC_EA_IC_FIM = 0 || update.FC_EA_IC_FIM;
        this.DSM = 0 || update.DSM;
        this.RTC = 0 || update.RTC;
        this.LOD_ANA_PL = 0 || update.LOD_ANA_PL;
    }

}