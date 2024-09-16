import { User } from "src/domain/user/user.entity";
export interface CreateAccount {
    bank_name:string,
    description?:string,
    user_id:User,
    balance:number
}
