export class Class {

    public verified: boolean;
    public schedule: any[];
    public note: string;

    constructor(
        public semesterKey: string,
        public courseKey: string,
        public courseName: string,
        public number: number,
        public professor1Key: string,
        public professor1Name: string,
        public professor2Key: string,
        public professor2Name: string
    ) { 
        this.verified = false;
        this.schedule = null;
        this.note = "";
    }

    toFirebaseObject() {
        var class_: any = {
            verified: this.verified,
            courseKey: this.courseKey,
            courseName: this.courseName,
            number: this.number,
            professor1Key: this.professor1Key,
            professor1Name: this.professor1Name,
            professor2Key: this.professor2Key,
            professor2Name: this.professor2Name,
            schedule: this.schedule,
            note: this.note
        }
        return <JSON>class_;
    }


}