import { RowDataPacket, ResultSetHeader } from "mysql2";
import { connect } from "../../db/connect";
import { IChecklist } from "../../models/interfaces/IChecklist";
import {
  ChecklistWithTodos,
  IChecklistRepository,
  SaveChecklistParams,
} from "../interfaces/IChecklistRepository";
import { ITodo } from "../../models/interfaces/ITodo";

export class ChecklistRepository implements IChecklistRepository {
  async getManyFromSpecificUserWithTodos(
    userId: number,
    offset: number,
    pageSize: number
  ): Promise<ChecklistWithTodos[]> {
    const db = await connect();
    pageSize = pageSize <= 50 || pageSize >= 1 ? pageSize : 50;
    const [result] = await db.query<RowDataPacket[]>(
      `SELECT c.*, t.id AS todo_id, t.content AS todo_content, t.done AS todo_done, t.checklist_id AS todo_checklist_id
       FROM checklists c
       LEFT JOIN todos t ON c.id = t.checklist_id
       WHERE c.user_id = ?
       ORDER BY c.id
       LIMIT ?
       OFFSET ?`,
      [userId, pageSize, offset]
    );
    const checklists: ChecklistWithTodos[] = [];
    const checklistMap: { [key: number]: ChecklistWithTodos } = {};
    result.forEach((row) => {
      const checklistId = row.id;

      if (!checklistMap[checklistId]) {
        const checklist: ChecklistWithTodos = {
          id: row.id,
          description: row.description,
          user_id: row.user_id,
          created_at: row.created_at,
          updated_at: row.updated_at,
          todos: [],
        };
        checklists.push(checklist);
        checklistMap[checklistId] = checklist;
      }

      if (row.todo_id) {
        const todo: ITodo = {
          id: row.todo_id,
          content: row.todo_content,
          done: Boolean(row.todo_done),
          created_at: row.created_at,
          updated_at: row.updated_at,
          checklist_id: row.todo_checklist_id,
        };
        checklistMap[checklistId].todos.push(todo);
      }
    });

    return checklists;
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
  async getById(checklistId: number): Promise<ChecklistWithTodos | null> {
    const db = await connect();
    //pageSize = pageSize<=50 || pageSize>=1?pageSize : 50
    const [result] = await db.query<RowDataPacket[]>(
      `SELECT c.*
      ,t.id AS todo_id,
      t.content AS todo_content,
      t.done AS todo_done 
      FROM checklists c 
      LEFT JOIN todos t
      ON t.checklist_id=c.id
      WHERE c.id=?`,
      [checklistId]
    );
    const checklist: ChecklistWithTodos = {
      id: result[0].id,
      description: result[0].description,
      user_id: result[0].user_id,
      created_at: result[0].created_at,
      updated_at: result[0].updated_at,
      todos: [],
    };
    result.forEach((row) => {
      if (row.todo_id) {
        const todo: ITodo = {
          id: row.todo_id,
          content: row.todo_content,
          done: Boolean(row.todo_done),
          created_at: row.created_at,
          updated_at: row.updated_at,
          checklist_id: checklistId,
        };
        checklist.todos.push(todo);
      }
    });
    if (result.length === 0) return null;
    return checklist;
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
    checklistDescription: string,
    userId:number
  ): Promise<boolean> {
    try {
      const db = await connect();
      const updatedAt = new Date();
      const [res] =await db.query<ResultSetHeader>(
        `UPDATE checklists SET description = ?, updated_at = ? WHERE id=? AND user_id=?`,
        [checklistDescription, updatedAt, checklistId,userId]
      )
        if(res.affectedRows!==1) return false
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
///  .getManyFromSpecificUserWithTodos(73, 0, 50)
//  .then((res) => {
//    console.log(res);  });
