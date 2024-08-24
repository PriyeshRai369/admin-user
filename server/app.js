import express from "express";
import cookieParser from "cookie-parser";
import { router } from "./src/routes/routs.js";
import cors from 'cors'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())
app.use(express.json({ limit: "100kb" }))
app.use("/user", router)

export { app }