import express from "express";
import morgan from "morgan";
import { router } from "./router";

const app = express()
app.use(morgan("tiny"))
app.use(express.json({limit:"50kb"}))


app.use(router)

export {app}