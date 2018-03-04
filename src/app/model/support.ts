export class Support {
    MS: boolean;
    SA: boolean;
    SM: boolean;
    FC_EA_IC_FIM: boolean;
    DSM: boolean;
    PCM: boolean;
    RTC: boolean;
    LOD_ANA_PL: boolean;
    NW: boolean;

  // areas = {};
    constructor() {
        this.MS = false;
        this.SA = false;
        this.SM = false;
        this.FC_EA_IC_FIM = false;
        this.DSM = false;
        this.PCM = false;
        this.RTC = false;
        this.LOD_ANA_PL = false;
        this.NW = false;
    }

  getSupportAreas(): string[] {
    return [];
  }



    update(update) {
      console.log(update);
        this.NW = false || JSON.parse(update.NW);
        this.MS = false || JSON.parse(update.MS);
        this.PCM = false || JSON.parse(update.PCM);
        this.SA = false || JSON.parse(update.SA);
        this.SM = false || JSON.parse(update.SM);
        this.FC_EA_IC_FIM = 0 || JSON.parse(update.FC_EA_IC_FIM);
        this.DSM = false || JSON.parse(update.DSM);
        this.RTC = false || JSON.parse(update.RTC);
        this.LOD_ANA_PL = false || JSON.parse(update.LOD_ANA_PL);
    }

    toJSONDBString() {
        return {
            MS: this.MS.toString(),
            SA: this.SA.toString(),
            SM: this.SM.toString(),
            FC_EA_IC_FIM: this.FC_EA_IC_FIM.toString(),
            DSM: this.DSM.toString(),
            PCM: this.PCM.toString(),
            RTC: this.RTC.toString(),
            LOD_ANA_PL: this.LOD_ANA_PL.toString(),
            NW: this.NW.toString()
        }
    }
}
