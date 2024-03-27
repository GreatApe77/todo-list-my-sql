import { Request, Response } from "express";
import { IUserRepository, SaveUserInfo } from "../repositories/interfaces/IUserRepository";
import bcrypt from "bcrypt"
import { handleInternalError } from "../errors/handleInternalError";
import { ILoginService, LogingUserData } from "../services/interfaces/ILoginService";
type CreateUserDto = SaveUserInfo
type LoginUserDto = LogingUserData
export class UserController{


    constructor(private readonly userRepo:IUserRepository,private readonly loginService:ILoginService){}


    async registerUser(req:Request,res:Response){
        const userData = req.body as CreateUserDto
        try {
            const hashedPassword = await bcrypt.hash(userData.password,10)
            userData.password = hashedPassword 
        } catch (error) {
           return handleInternalError(error,res)
        }
       
        try {
            
            await this.userRepo.save(userData)
            return res.sendStatus(201)
        } catch (error:any) {
            if(error.code==="ER_DUP_ENTRY"){
                return res.status(400).json({
                    message:"User already exists"
                })
            }
            return handleInternalError(error,res)
        }

    }

    async loginAsUser(req:Request,res:Response){
        const {username,password} = req.body as LoginUserDto
        
        try {
            const token = await this.loginService.login({password,username})
            return res.status(200).json({
                token
            })
        } catch (error) {
            return handleInternalError(error,res)
        }
    }
}