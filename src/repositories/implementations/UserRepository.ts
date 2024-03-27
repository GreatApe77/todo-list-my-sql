import { connect } from "../../db/connect";
import {
  IUserRepository,
  SaveUserInfo,
  UserWithNoPassword,
} from "../interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
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
