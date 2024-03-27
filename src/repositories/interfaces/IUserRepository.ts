import { IUser } from "../../models/interfaces/IUser"

export type SaveUserInfo = Pick<IUser,"username"|"password"|"full_name">
export type UserWithNoPassword = Omit<IUser,"password">

export interface IUserRepository{
    save(user:SaveUserInfo):Promise<void>
    getById(id:number):Promise<UserWithNoPassword>
    getByUsername(username:string):Promise<IUser|null>

}