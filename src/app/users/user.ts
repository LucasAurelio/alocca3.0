export class User {

    constructor(
        public siape,
        public name,
		public permission: string,
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