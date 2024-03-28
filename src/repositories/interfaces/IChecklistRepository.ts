import { IChecklist } from "../../models/interfaces/IChecklist"


export type SaveChecklistParams = Pick<IChecklist,"description"|"user_id">
export interface IChecklistRepository{

    save(checklist:SaveChecklistParams):Promise<boolean>
    delete(checklistId:number):Promise<boolean>
    getById(checklistId:number):Promise<IChecklist|null>
    getMany(offset:number,pageSize:number):Promise<IChecklist[] | null>
    updateDescription(checklistDescription:string):Promise<boolean>

}