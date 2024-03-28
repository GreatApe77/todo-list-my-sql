import { env } from "../../config/environment";
import { HttpException } from "../../errors/HttpException";
import { handleInternalError } from "../../errors/handleInternalError";
import { Request, Response, NextFunction } from "express";
import {verify} from "jsonwebtoken"
export class AuthUser{
    
  

    public static async validateToken(req:Request,res:Response,next:NextFunction){
        try {
            const token = req.headers.authorization?.split(" ")[1]
            if(!token) throw new HttpException("Token not provided",401)
            const payload =  verify(token,env.JWT_SECRET) 
            res.locals.payload = payload
            next()
        } catch (error) {
            return handleInternalError(error,res)
        }
    }


}