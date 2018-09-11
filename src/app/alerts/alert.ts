export class Alert {

    constructor(
        public semesterKey: string,
        public type: string,
        public message: string,
        public isIgnored: boolean
    ) { }

    toFirebaseObject() {
        var class_: any = {
            type: this.type,
            message: this.message,
            isIgnored: this.isIgnored
        }
        return <JSON>class_;
    }

}