import { RowDataPacket } from "mysql2";
import { connect } from "../../db/connect";
import { IChecklist } from "../../models/interfaces/IChecklist";
import {
  ChecklistWithTodos,
  IChecklistRepository,
  SaveChecklistParams,
} from "../interfaces/IChecklistRepository";

export class ChecklistRepository implements IChecklistRepository {
  async getManyFromSpecificUserWithTodos(
    userId: number,
    offset: number,
    pageSize: number
  ): Promise<ChecklistWithTodos[]> {
    /* const db = await connect();
    pageSize = pageSize <= 50 || pageSize >= 1 ? pageSize : 50;
    const [result] = await db.query(
      "SELECT c.updated_at AS checklist_updated_at, c.created_at AS checklist_created_at, c.id AS checklist_id,c.description AS checklist_description,t.id AS todo_id,t.content AS todo_content,t.done AS todo_done FROM checklists c JOIN todos t ON c.id = t.checklist_id JOIN users u ON c.user_id = u.id WHERE  u.id = ?  LIMIT ? OFFSET ?",

      [userId, pageSize,offset]
    );
    console.log(result)
    const formated =  result.map((result)=>{
      return {
        id:result.checklist_id,
        description:result.checklist_description,
        created_at:result.checklist_created_at,
        updated_at:result.checklist_updated_at,
        

      }
    })
    
    console.log(formated)
    //console.log(result); */
    return [];
  }
  async save(checklist: SaveChecklistParams): Promise<boolean> {
    try {
      const db = await connect();
      await db.query(
        "INSERT INTO checklists(description,user_id) VALUES(?,?)",
        [
          checklist.description ? checklist.description : null,
          checklist.user_id,
        ]
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async delete(checklistId: number): Promise<boolean> {
    try {
      const db = await connect();
      await db.query("DELETE * FROM checklists WHERE id=?", [checklistId]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async getById(checklistId: number): Promise<IChecklist | null> {
    const db = await connect();
    //pageSize = pageSize<=50 || pageSize>=1?pageSize : 50
    const [result] = await db.query<IChecklist[] & RowDataPacket[][]>(
      "SELECT * FROM checklists WHERE id=?",
      [checklistId]
    );
    if (result.length === 0) return null;
    return result[0];
  }
  async getManyFromSpecificUser(
    userId: number,
    offset: number,
    pageSize: number
  ): Promise<IChecklist[]> {
    const db = await connect();
    pageSize = pageSize <= 50 || pageSize >= 1 ? pageSize : 50;
    const [result] = await db.query<IChecklist[] & RowDataPacket[][]>(
      "SELECT * FROM checklists WHERE user_id=? LIMIT ? OFFSET ?",
      [userId, pageSize, offset]
    );
    //console.log(result)

    return result;
  }

  async updateDescription(
    checklistId: number,
    checklistDescription: string
  ): Promise<boolean> {
    try {
      const db = await connect();
      const updatedAt = new Date();
      await db.query(
        "UPDATE checklists SET description = ?, updated_at = ? WHERE id=?",
        [checklistDescription, updatedAt, checklistId]
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

//new ChecklistRepository().getManyFromSpecificUser(43,0,2)
//.then((res)=>{console.log(res)})
//new ChecklistRepository().updateDescription(1,"Tomei ja o banho mds")
//.then((res)=>{console.log(res)})
//new ChecklistRepository()
//  .getManyFromSpecificUserWithTodos(73, 0, 50)
//  .then((res) => {
//    console.log(res);
//  });
