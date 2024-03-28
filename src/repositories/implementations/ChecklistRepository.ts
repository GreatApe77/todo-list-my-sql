import { RowDataPacket } from "mysql2";
import { connect } from "../../db/connect";
import { IChecklist } from "../../models/interfaces/IChecklist";
import { IChecklistRepository, SaveChecklistParams } from "../interfaces/IChecklistRepository";

export class ChecklistRepository implements IChecklistRepository{
    async save(checklist: SaveChecklistParams): Promise<boolean> {
        try {
            const db = await connect();
            await db.query("INSERT INTO checklists(description,user_id) VALUES(?,?)",
            [checklist.description?checklist.description:null,checklist.user_id])
            return true
        } catch (error) {
            console.error(error)
            return false
        }
        
    
    }
    delete(checklistId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getById(checklistId: number): Promise<IChecklist | null> {
        throw new Error("Method not implemented.");
    }
    async getManyFromSpecificUser(userId:number,offset:number,pageSize:number):Promise<IChecklist[]> {
        const db = await connect()
        pageSize = pageSize<=50 || pageSize>=1?pageSize : 50
        const [result] = await db.query<IChecklist[] & RowDataPacket[][]>("SELECT * FROM checklists WHERE user_id=? LIMIT ? OFFSET ?",[userId,pageSize,offset])
    //console.log(result)
    
    return result

    }
    updateDescription(checklistDescription: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}

//new ChecklistRepository().getManyFromSpecificUser(43,0,2)
//./then((res)=>{console.log(res)})