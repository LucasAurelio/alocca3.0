export class Class {

    public verified: boolean;
    public schedule: any[];
    public note: string;

    constructor(
        public semesterKey: string,
        public courseKey: string,
        public number: number,
        public professor1Key: string,
        public professor2Key: string
    ) { 
        this.verified = false;
        this.schedule = null;
        this.note = "";
    }

    toFirebaseObject() {
        var class_: any = {
            verified: this.verified,
            course: this.courseKey,
            number: this.number,
            professor1: this.professor1Key,
            professor2: this.professor2Key,
            schedule: this.schedule,
            note: this.note
        }
        return <JSON>class_;
    }


}