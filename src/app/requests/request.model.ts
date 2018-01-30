export class Request {
    constructor(
        public SIAPE: string,
        public name: string,
        public email: string
    ) {}

    /**
     * @returns This request's SIAPE number.
     */
    getSIAPE(): string{
        return this.SIAPE;
    }

    /**
     * @returns This request's name.
     */
    getName(): string{
        return this.name;
    }

    /**
     * @returns This request's email.
     */
    getEmail(): string{
        return this.email;
    }

    /**
     * This request (object) in a JSON format.
     * 
     * @returns JSON element.
     */
    toFirebaseObject(): JSON {
        var request: any = {
            SIAPE: this.getSIAPE(),
            name: this.getName(),
            email: this.getEmail()
        }
        return <JSON>request;
    }

} 