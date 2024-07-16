import companyRouter from "./companyRoutes"
import contactRouter from "./contactRoutes"
import userRouter from "./userRoutes"
import dealRouter from "./dealRoutes"
import express from "express"
const app = express()

app.use("/auth", userRouter)
app.use("/companies", companyRouter)
app.use("/contacts", contactRouter)
app.use("/deals", dealRouter)
export default app