import { IUserRepository, SaveUserInfo, UserWithNoPassword } from "../interfaces/IUserRepository";

export class UserRepository implements IUserRepository{
    save(user: SaveUserInfo): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<UserWithNoPassword> {
        throw new Error("Method not implemented.");
    }
   

}