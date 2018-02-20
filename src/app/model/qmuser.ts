export class QmUser {
    private iNumber: string = "i123";
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
        return "DEFAULT";
    }

}