export class Course {
    constructor(
        public code: string,
        public name: string,
        public shortname: string,
        public credits: number,
        public offererDepartment: string,
        public requesterDepartment: string,
        public type: string,
        public minimumSemester: number,
        public maximumSemester: number
    ) {}

    toFirebaseObject(): any{
        var course: any = {
            code: this.code,
            name: this.name,
            shortname: this.shortname,
            credits: this.credits,
            type: this.type,
            offererDepartment: this.offererDepartment,
            requesterDepartment: this.requesterDepartment,
            minimumSemester: this.minimumSemester,
            maximumSemester: this.maximumSemester,
        }
        return <JSON>course;
    }

}