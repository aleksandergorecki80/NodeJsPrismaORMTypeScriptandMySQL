import { HttpException, HttpErrorCodes } from "./root";

export class UnprocessableEntityException extends HttpException {
    constructor(message:string, errorCode: HttpErrorCodes, statusCode: number, errors: any) {
        super(message, errorCode, 422, errors);
    }
}