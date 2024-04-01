import { env } from "../../config/environment";
import { HttpException } from "../../errors/HttpException";
import { handleInternalError } from "../../errors/handleInternalError";
import { Request, Response, NextFunction } from "express";
import {verify,TokenExpiredError} from "jsonwebtoken"
export class AuthUser{
    
  

    public static async validateToken(req:Request,res:Response,next:NextFunction){
        try {
            const token = req.headers.authorization?.split(" ")[1]
            if(!token) throw new HttpException("Token not provided",401)
            const payload =  verify(token,env.JWT_SECRET) 
            res.locals.payload = payload
            next()
        } catch (error) {
            if(error instanceof TokenExpiredError){
                const exception = new HttpException("Token Expired",400)
                return handleInternalError(exception,res)
            }
            return handleInternalError(error,res)
        }
    }


}