import dotenv from "dotenv";
import e from "express";

dotenv.config({ path: ".env" });

export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET;