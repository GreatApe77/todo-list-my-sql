import { FieldPacket, RowDataPacket } from "mysql2";
import { connect } from "../../db/connect";
import { IUser } from "../../models/interfaces/IUser";
import {
  IUserRepository,
  SaveUserInfo,
  UserWithNoPassword,
} from "../interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
  async getByUsername(username: string): Promise<IUser|null> {
    const db = await connect();
    const [result] = await db.query<IUser[] & RowDataPacket[][]>("SELECT * FROM users WHERE username=?",[username])
    //console.log(result)
    if(result.length===0) return null
    return result[0]
  }
  //private static readonly TABLE_NAME:string = "users"
  async save(user: SaveUserInfo): Promise<void> {
    const db = await connect();
    await db.query(
      `INSERT INTO users(username,password,full_name) VALUES(?,?,?)`,
      [user.username, user.password, user.full_name ? user.full_name : null]
    );
  }
  getById(id: number): Promise<UserWithNoPassword> {
    throw new Error("Method not implemented.");
  }
}


//new UserRepository().getByUsername("mateus777").then(r=>console.log(r))