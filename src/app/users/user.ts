import { UserPermission } from './permission';

export class User {

    constructor(
        public email: string,
		    public permission: UserPermission
    ) { }

    toFirebaseObject() {
        var user: any = {
            email: this.email,
			permission: this.permission
        }
        return <JSON>user;
    }
}
