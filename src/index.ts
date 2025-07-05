import express, { Request, Response, Express } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";

const app: Express = express();

// app.get("/", (req: Request, res: Response) => {
//     res.send("Hello World");
// });

app.use('/api', rootRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

