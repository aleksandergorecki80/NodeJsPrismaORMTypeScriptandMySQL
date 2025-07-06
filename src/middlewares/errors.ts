import { HttpErrorCodes, HttpException } from "../exceptions/root";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    // Check if it's our custom HttpException
    if (error instanceof HttpException) {
        res.status(error.statusCode).json({
            errorCode: error.errorCode,
            message: error.message,
            errors: error.errors
        });
    } else {
        // Handle other types of errors (like Prisma errors, validation errors, etc.)
        console.error('Unhandled error:', error);
        res.status(500).json({
            errorCode: HttpErrorCodes.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
            errors: null
        });
    }
}