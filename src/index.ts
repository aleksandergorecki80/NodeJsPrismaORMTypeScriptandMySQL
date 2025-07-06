import express, { Request, Response, Express } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "./generated/prisma";
import { errorMiddleware } from "./middlewares/errors";
import { registerSchema } from "./schema/userSchema";

const app: Express = express();

// app.get("/", (req: Request, res: Response) => {
//     res.send("Hello World");
// });

app.use(express.json());
app.use('/api', rootRouter);
app.use(errorMiddleware);

export const prismaClient = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
}).$extends({
    query: {
        user: {
            create({
                args, query
            }) {
                try {
                    args.data = registerSchema.parse(args.data);
                    return query(args);
                } catch (error: any) {
                    throw new Error(`Validation error: ${error.message}`);
                }
            }
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

