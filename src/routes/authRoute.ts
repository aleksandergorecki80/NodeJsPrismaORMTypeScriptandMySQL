import { Router } from "express";
import { register } from "../controllers/authController";

const authRoutes: Router = Router();

authRoutes.post('/register', register);

export default authRoutes;