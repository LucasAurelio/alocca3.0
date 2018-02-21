export class Professor {

    constructor(
        public siape: string,
        public name: string,
        public nickname: string
    ) {}
    
    toFirebaseObject() {
        var professor: any = {
            siape: this.siape,
            name: this.name,
            nickname: this.nickname
        }
        return <JSON>professor;
    }
}