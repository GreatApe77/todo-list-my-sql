import { Response,Request } from "express";
import { IChecklistRepository } from "../repositories/interfaces/IChecklistRepository";
import { handleInternalError } from "../errors/handleInternalError";
import { HttpException } from "../errors/HttpException";
import { IChecklist } from "../models/interfaces/IChecklist";

type CreateChecklistDTO = Pick<IChecklist,"description">
export class ChecklistController{

    constructor( private readonly checklistsRepository:IChecklistRepository){}
    async create(req:Request,res:Response){
        try {
            //const user_id = parseInt(req.params.userId)
            const {description}  =req.body as CreateChecklistDTO
            const userId = parseInt(req.params.userId)
            const authUserId = parseInt(res.locals.payload.id)
            if(userId!==authUserId) throw new HttpException("Unauthorized",403) 
            await this.checklistsRepository.save({user_id:userId,description})
            return res.sendStatus(200)
        } catch (error) {

            return handleInternalError(error,res)
        }
    }
    async getById(req:Request,res:Response){
        try {
            const checklistId = parseInt(req.params.checklistId)
            const userId = parseInt(req.params.userId)
            const authUserId = parseInt(res.locals.payload.id)
            console.log({checklistId,userId,authUserId})
            if(userId!==authUserId) throw new HttpException("Unauthorized",403) 
            //await this.checklistsRepository.save(req.body)
            const checklist = await this.checklistsRepository.getById(checklistId)
            
            if(!checklist) throw new HttpException("Checklist not found",404)
            if(checklist.user_id!==userId) throw new HttpException("Unauthorized",403)
            return res.status(200).json(checklist)
        } catch (error) {

            return handleInternalError(error,res)
        }
    }
    async getUsersChecklist(req:Request,res:Response){
        try {
            //const checklistId = parseInt(req.params.checklistId)
            const userId = parseInt(req.params.userId)
            const authUserId = parseInt(res.locals.payload.id)
            if(userId!==authUserId) throw new HttpException("Unauthorized",403) 
            //await this.checklistsRepository.save(req.body)
            const checklists = await this.checklistsRepository.getManyFromSpecificUser(userId,0,50)
            //if(!checklist) throw new HttpException("Checklist not found",404)

            return res.status(200).json(checklists)
        } catch (error) {

            return handleInternalError(error,res)
        }
    }
    
}