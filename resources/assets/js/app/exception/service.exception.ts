class Exception extends Error {
    constructor(message:string) {
        super(message);
        this.message = message;
        this.stack = (new Error()).stack;
    }

    json(){
        return JSON.stringify({message: this.message});
    }
}
export class ServiceException extends Exception {

}