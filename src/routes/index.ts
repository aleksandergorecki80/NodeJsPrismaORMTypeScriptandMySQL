import { Router } from "express";
import authRoutes from "./authRoute";

const rootRouter = Router();

rootRouter.use('/auth', authRoutes);

export default rootRouter;