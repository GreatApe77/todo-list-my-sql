import { Request, Response } from "express";
import { IUserRepository, SaveUserInfo } from "../repositories/interfaces/IUserRepository";
import { User } from "../models/implementations/User";
import bcrypt from "bcrypt"
import { handleErrors } from "../errors/handleErrors";
type CreateUserDto = SaveUserInfo

export class UserController{


    constructor(private readonly userRepo:IUserRepository){}


    async registerUser(req:Request,res:Response){
        const userData = req.body as CreateUserDto
        try {
            const hashedPassword = await bcrypt.hash(userData.password,10)
            userData.password = hashedPassword 
        } catch (error) {
            return handleErrors(error,res)
        }
        //const user = new User(userData)
        try {
            
            await this.userRepo.save(userData)
            return res.sendStatus(201)
        } catch (error:any) {
            if(error.code==="ER_DUP_ENTRY"){
                return res.status(400).json({
                    message:"User already exists"
                })
            }
            return handleErrors(error,res)
        }

    }
}