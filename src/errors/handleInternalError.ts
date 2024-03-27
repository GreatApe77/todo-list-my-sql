import { Response } from "express";
import { HttpException } from "./HttpException";

export function handleInternalError(error:any,res:Response){
    console.error(error)
    if(error instanceof HttpException){
        
        return res.status(error.statusCode).json({
            message:error.statusCode===500?"Internal Server Error":error.message
        })
    }
    return res.sendStatus(500)
}