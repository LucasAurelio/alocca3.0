import { ScheduleRestriction } from './schedule-restriction'

export class ProfessorRestriction {
    constructor(
        public professorKey: string,
        public semesterKey: string,
        public minCredits: number,
        public maxCredits: number,
        public graduationCredits: number,
        public scheduleRestrictions: ScheduleRestriction
    ) { }

    toFirebaseObject() {
       var firebaseObject: any = {
           'minCredits': this.minCredits,
           'maxCredits': this.maxCredits,
           'graduationCredits': this.graduationCredits,
           'scheduleRestrictions': this.scheduleRestrictions
       };
       return <JSON>firebaseObject;
    }
}
