export class HttpException extends Error {
    // message: string;
    errorCode: HttpErrorCodes;
    statusCode: number;
    errors: any;
    
    constructor(message: string, errorCode: HttpErrorCodes, statusCode: number, errors: any) {
        super(message);
        // this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export enum HttpErrorCodes {
    USER_NOT_FOUND = 1000,
    USER_ALREADY_EXISTS = 1001,
    INCORRECT_CREDENTIALS = 1002,
}
