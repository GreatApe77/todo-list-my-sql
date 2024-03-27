import { IUser } from "../../models/interfaces/IUser"

export type LogingUserData = Pick<IUser,"username"|"password">
export interface ILoginService{
    login(loggingUser:LogingUserData):Promise<string>
}