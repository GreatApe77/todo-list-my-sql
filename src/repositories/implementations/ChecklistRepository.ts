import { RowDataPacket } from "mysql2";
import { connect } from "../../db/connect";
import { IChecklist } from "../../models/interfaces/IChecklist";
import {
  IChecklistRepository,
  SaveChecklistParams,
} from "../interfaces/IChecklistRepository";

export class ChecklistRepository implements IChecklistRepository {
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