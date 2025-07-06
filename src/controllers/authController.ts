import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { BadRequestException } from "../exceptions/bad-request";
import { HttpErrorCodes } from "../exceptions/root";
import { UnprocessableEntityException } from "../exceptions/validation";
import { registerSchema } from "../schema/userSchema";

export const register = async (req: Request, res: Response, next: NextFunction) => {

    try {
        registerSchema.parse(req.body);
        const { name, email, password } = req.body;

        let user = await prismaClient.user.findFirst({
            where: {
                email        
            }
        });
    
        if (user) {
            next(new BadRequestException("User already exists", HttpErrorCodes.USER_ALREADY_EXISTS));
            return;
        }
        user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: hashSync(password, 10)
            }
        });
    
        res.status(201).json({
            message: "User created successfully",
            user
        });
    } catch (error: any) {
        console.error('Registration error:', error);
        next(new UnprocessableEntityException("Unprocessable Entity", HttpErrorCodes.UNPROCESSABLE_ENTITY, 422, error.issues || error.message));
    }


}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        let user = await prismaClient.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            next(new BadRequestException("User not found", HttpErrorCodes.USER_NOT_FOUND));
            return;
        }

        const isPasswordValid = compareSync(password, user.password);

        if (!isPasswordValid) {
            next(new BadRequestException("Invalid username or password", HttpErrorCodes.INCORRECT_CREDENTIALS));
            return;
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
        
        res.status(200).json({
            message: "Login successful",
            user,
            token
        });
    } catch (error: any) {
        console.error('Login error:', error);
        next(new UnprocessableEntityException("Login failed", HttpErrorCodes.UNPROCESSABLE_ENTITY, 422, error.message));
    }
}