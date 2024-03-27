import { Request,Response,NextFunction } from "express";
import { CreateUserSchema, LoginUserSchema } from "./request-schemas";
import { handleInternalError } from "../errors/handleInternalError";
import { HttpException } from "../errors/HttpException";
export class RequestValidator{

    public static validateCreateUserRequest(req:Request,res:Response,next:NextFunction){
        try {
            const valid = CreateUserSchema.safeParse(req.body)
            if(!valid.success) throw new HttpException("Invalid Request",422)
            next()
        } catch (error) {
            return handleInternalError(error,res)
        }
    }
    public static validateLoginUserRequest(req:Request,res:Response,next:NextFunction){
        try {
            const valid = LoginUserSchema.safeParse(req.body)
            if(!valid.success) throw new HttpException("Invalid Request",422)
            next()           
        } catch (error) {
            return handleInternalError(error,res)
        }
    }

}