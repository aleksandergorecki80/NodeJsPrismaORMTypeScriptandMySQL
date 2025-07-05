import dotenv from "dotenv";
import e from "express";

dotenv.config({ path: ".env" });

export const PORT = process.env.PORT || 3000;