export class Class {

    public verified: boolean;
    public schedule;
    public note: string;
    public timetable: number;

    constructor(
        public semesterKey: string,
        public courseKey: string,
        public courseName: string,
        public number: number,
        public professor1Key: string,
        public professor1Name: string,
        public professor2Key: string,
        public professor2Name: string,
        public courseType: string,
        public courseSemester: number
    ) { 
        this.verified = false;
        this.schedule = {
                monday:{
                    hours:['']
                },
                tuesday:{
                    hours:['']
                },
                wednesday:{
                    hours:['']
                },
                thursday:{
                    hours:['']
                },
                friday:{
                    hours:['']
                }
        }
        this.note = "";
        this.timetable = 0;
    }

    addHour(day: string, hour: number){
        if(day=='Segunda'){
            this.schedule.monday.hours.push(hour);
        }else if(day=='Terça'){
            this.schedule.tuesday.hours.push(hour);
        }else if(day=='Quarta'){
            this.schedule.wednesday.hours.push(hour);
        }else if(day=='Quinta'){
            this.schedule.thursday.hours.push(hour);
        }else{
            this.schedule.friday.hours.push(hour);
        }
    }

    addToTimeTable(hours){
        this.timetable = this.timetable + hours;
    }

    removeFromTimeTable(hours){
        this.timetable = this.timetable - hours;
    }

    setTimeTable(hours){
        this.timetable = hours;
    }

    setVerifiedState(state: boolean){
        this.verified = state;
    }

    setSchedule(currentSchedule){
        this.schedule = currentSchedule;
    }

    setNote(not: string){
        this.note = not;
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
            note: this.note,
            courseType: this.courseType,
            courseSemester: this.courseSemester,
            timetable: this.timetable
        }
        return <JSON>class_;
    }


}