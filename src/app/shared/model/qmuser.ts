export class QmUser {
    private iNumber: string = "i123";
    private name: string;
    constructor(iNumber: string) {
        this.iNumber = iNumber;
    }
    setINumber(iNumber: string): void {
        this.iNumber = iNumber;
    }
    getINumber(): string {
        return this.iNumber;
    }
    getName(): string {
        if (this.name) {
            return this.name;
        } else {
            return this.iNumber;
        }
    }

    setName(name: string) {
        this.name = name;
    }

}