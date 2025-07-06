import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { BadRequestException } from "../exceptions/bad-request";
import { HttpErrorCodes } from "../exceptions/root";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    let user = await prismaClient.user.findFirst({
        where: {
            email        
        }
    });

    if (user) {
        next(new BadRequestException("User already exists", HttpErrorCodes.USER_ALREADY_EXISTS));
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
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    let user = await prismaClient.user.findFirst({
        where: {
            email
        }
    });

    if (!user) {
        throw new BadRequestException("User not found", HttpErrorCodes.USER_NOT_FOUND);
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
        throw new BadRequestException("Invalid username or password", HttpErrorCodes.INCORRECT_CREDENTIALS);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    
    res.status(200).json({
        message: "Login successful",
        user,
        token
    });
}