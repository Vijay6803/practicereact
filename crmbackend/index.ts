import express, { Express, Request, Response } from "express";
import userRouter from "./src/routes/userRoutes"
import companyRouter from "./src/routes/companyRoutes"
import cookieParser from "cookie-parser";
import router from "./src/routes/allRoutes"
import configObj from "./src/config/env.config";
const app: Express = express();
const port = configObj.PORT;
app.use(cookieParser())
app.use(express.json())
app.use("/", router)
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});