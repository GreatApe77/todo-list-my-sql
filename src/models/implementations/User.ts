import { IUser } from "../interfaces/IUser";

export class User implements Partial<IUser>{
   id?: number | undefined;
   created_at?: Date | undefined;
   full_name?: string | undefined;
   password?: string | undefined;
   updated_at?: Date | undefined;
   username?: string | undefined;
    constructor(props:Partial<IUser>){
        this.id = props.id
        this.username=props.username
        this.password = props.password
        this.full_name = props.full_name
        this.created_at = props.created_at || new Date()
        this.updated_at = props.updated_at || new Date()
        //Object.assign(this,props)
        
    }

}