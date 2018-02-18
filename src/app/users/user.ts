export class User {

    constructor(
        public siape: string,
        public name: string,
	    	public permission: number,
        public email: string
    ) { }

    toFirebaseObject() {
        var user: any = {
            siape: this.siape,
            name: this.name,
			permission: this.permission,
            email: this.email
        }
        return <JSON>user;
    }
}
