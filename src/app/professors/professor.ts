export class Professor {

    constructor(
        public siap: string,
        public name: string,
        public nickname: string
    ) {}
    
    toFirebaseObject() {
        var professor: any = {
            siap: this.siap,
            name: this.name,
            nickname: this.nickname
        }
        return <JSON>professor;
    }
}