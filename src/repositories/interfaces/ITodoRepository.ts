import { ITodo } from "../../models/interfaces/ITodo"

export type SaveTodoParam = Pick<ITodo,"checklist_id"|"content">
export interface ITodoRepository{
    save(todo:SaveTodoParam):Promise<boolean>
    flipDoneStatus(id:number):Promise<boolean>
    updateContent(id:number,content:string):Promise<Boolean>
    deleteOne(id:number):Promise<boolean>
    getById(id:number):Promise<ITodo| null>
    getManyFromSpecificChecklist(checklistId:number,offset:number,pageSize:number):Promise<ITodo[]>

}