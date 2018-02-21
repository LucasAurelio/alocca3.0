export class Request {
    constructor(
        public siape: string,
        public name: string,
        public email: string
    ) {}

    /**
     * @returns This request's siape number.
     */
    getsiape(): string{
        return this.siape;
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
            siape: this.getsiape(),
            name: this.getName(),
            email: this.getEmail()
        }
        return <JSON>request;
    }

} 