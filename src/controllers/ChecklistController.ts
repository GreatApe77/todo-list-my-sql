import { Response,Request } from "express";
import { IChecklistRepository } from "../repositories/interfaces/IChecklistRepository";
import { handleInternalError } from "../errors/handleInternalError";
import { HttpException } from "../errors/HttpException";

export class ChecklistController{

    constructor( private readonly checklistsRepository:IChecklistRepository){}
    async create(req:Request,res:Response){
        try {
            await this.checklistsRepository.save(req.body)
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
            if(userId!==authUserId) throw new HttpException("Unauthorized",403) 
            //await this.checklistsRepository.save(req.body)
            const checklist = await this.checklistsRepository.getById(checklistId)
            if(!checklist) throw new HttpException("Checklist not found",404)

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