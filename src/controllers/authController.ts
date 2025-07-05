import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
    console.log('register');
    res.send('register');
}