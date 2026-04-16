import "dotenv/config";


import express from "express"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import websiteRouter from "./routes/website.routes.js"
import billingRouter from "./routes/billing.routes.js"
import { stripeWebhook } from "./controllers/stripeWebhook.controller.js"

const app=express()

console.log("CWD:", process.cwd());
console.log("ENV:", process.env.TEST_VAR);

app.post("/api/stripe/webhook",express.raw({type:"application/json"}),stripeWebhook)
const port=process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:5173", "https://genwebsi-front.onrender.com"],
    credentials:true
}))
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/website",websiteRouter)
app.use("/api/billing",billingRouter)

app.listen(port,()=>{
    console.log("server started",port)
    connectDb()
})