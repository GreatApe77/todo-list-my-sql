import { RowDataPacket } from "mysql2";
import { connect } from "../../db/connect";
import { ITodo } from "../../models/interfaces/ITodo";
import { ITodoRepository, SaveTodoParam } from "../interfaces/ITodoRepository";

export class TodoRepository implements ITodoRepository{
    async save(todo: SaveTodoParam): Promise<boolean> {
        try {
            const db = await connect()
            await db.query("INSERT INTO todos(content,checklist_id) VALUES(?,?)",[todo.content,todo.checklist_id])
            return true
        } catch (error) {
            console.error(error)
            return false            
        }
    }
    async flipDoneStatus(id: number): Promise<boolean> {
        try {
            const db = await connect()
            await db.query("UPDATE todos SET done = NOT done WHERE id=?",[id])
            return true
        } catch (error) {
            console.error(error)
            return false            
        }
    }
    async updateContent(id: number, content: string): Promise<Boolean> {
        try {
            const db = await connect()
            await db.query("UPDATE todos SET content=? WHERE id=?",[content,id])
            return true
        } catch (error) {
            console.error(error)
            return false            
        }
    }
    async deleteOne(id: number): Promise<boolean> {
        try {
            const db = await connect()
            await db.query("DELETE * FROM todos WHERE id=?",[id])
            return true
        } catch (error) {
            console.error(error)
            return false            
        }
    }
    async getById(id: number): Promise<ITodo | null> {
        const db = await connect()
        const [result] = await db.query<ITodo[] & RowDataPacket[][]>(
            "SELECT * FROM todos WHERE id=?",
            [id]
          );
          if (result.length === 0) return null;
          return result[0];
    }
    async getManyFromSpecificChecklist(checklistId: number, offset: number, pageSize: number): Promise<ITodo[]> {
        const db = await connect();
    pageSize = pageSize <= 50 || pageSize >= 1 ? pageSize : 50;
    const [result] = await db.query<ITodo[] & RowDataPacket[][]>(
      "SELECT * FROM todos WHERE checklist_id=? LIMIT ? OFFSET ?",
      [checklistId, pageSize, offset]
    );
    //console.log(result)

    return result;
    }
}

//new TodoRepository().save()