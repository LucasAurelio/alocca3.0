export class Professor {

    constructor(
        public siap: number,
        public name: string,
        public nickname: string
    ) {}

    getSiap() {
        return this.siap;
    }

    setSiap(newSiap: number) {
        this.siap = newSiap;
    }

    getName() {
        return this.siap;
    }

    setName(newName: string) {
        this.name = newName;
    }

    getNickname() {
        return this.nickname;
    }

    setNickname(newNickname: string) {
        this.nickname = newNickname;
    }
    
    toFirebaseObject() {
        var professor: any = {
            siap: this.siap,
            name: this.name,
            nickname: this.nickname
        }
        return <JSON>professor;
    }
}