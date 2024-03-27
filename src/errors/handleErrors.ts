import { Response } from "express";
import { HttpExcpetion } from "./HttpException";

export function handleErrors(error:any,res:Response){
    console.error(error)
    const errorMsg = "Internal Server Error"
    if(error instanceof HttpExcpetion){
        
        return res.status(error.statusCode).json(
            {

                message:error.statusCode===500?errorMsg:error.message
            }
        )
    }
    return res.status(500).json({
        message:errorMsg
    })
}