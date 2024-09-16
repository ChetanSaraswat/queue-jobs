import { Balance } from "src/domain/account/account-balance";
import { User } from "src/domain/user/user.entity";
export interface CreateAccountPayload {
    bank_name:string,
    description?:string,
    user_id:User,
    balance:number
}

export interface CreateAccount {
    bank_name:string,
    description?:string,
    user_id:User,
    balance:Balance
}