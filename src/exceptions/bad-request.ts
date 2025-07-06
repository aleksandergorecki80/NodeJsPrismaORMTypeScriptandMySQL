import { HttpException, HttpErrorCodes } from "./root";

export class BadRequestException extends HttpException {
    constructor(message: string, errorCode: HttpErrorCodes) {
        super(message, errorCode, 400, null);
    }
}