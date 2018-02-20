export class QmUser {
    name: string;
    iNumber: string = "i123";
    constructor(name: string) {
        this.name = name;
    }
    setName(name: string): void{
        this.name = name;
    }
    getName() : string{
        return this.name;
    }
    setINumber(iNumber: string){
        this.iNumber = iNumber;
    }
}