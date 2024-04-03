import { IChecklist } from "../../models/interfaces/IChecklist"
import { ITodo } from "../../models/interfaces/ITodo"


export type SaveChecklistParams = Pick<IChecklist,"description"|"user_id">
export type ChecklistWithTodos = IChecklist & {
    todos:ITodo[]
}
export interface IChecklistRepository{

    save(checklist:SaveChecklistParams):Promise<boolean>
    delete(checklistId:number):Promise<boolean>
    getById(checklistId:number):Promise<ChecklistWithTodos|null>
    getManyFromSpecificUser(userId:number,offset:number,pageSize:number):Promise<IChecklist[]>
    updateDescription(checklistId:number,checklistDescription:string,userId:number):Promise<boolean>
    getManyFromSpecificUserWithTodos( userId: number,
        offset: number,
        pageSize: number):Promise<ChecklistWithTodos[]>
}