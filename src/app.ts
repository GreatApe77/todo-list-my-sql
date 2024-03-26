import express from "express";
import morgan from "morgan";

const app = express()
app.use(morgan("tiny"))
app.use(express.json({limit:"50kb"}))




export {app}