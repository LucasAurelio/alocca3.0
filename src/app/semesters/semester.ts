export class Semester {

    public identifier: string;

    constructor(year: number, semester: number) {
        this.identifier = year + '.' + semester;
    }

    toFirebaseObject(): JSON {
        var semester: any = {
            identifier: this.identifier,
        }
        return <JSON>semester;
    }
}