export class Class {

    public verified: boolean;
    public schedule;
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
        //SET NOTEN OTNOENEO
        this.note = "";
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

    setVerifiedState(state: boolean){
        this.verified = state;
    }

    setSchedule(currentSchedule){
        this.schedule = currentSchedule;
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