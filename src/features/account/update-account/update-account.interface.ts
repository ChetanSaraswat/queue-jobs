import { Balance } from "src/domain/account/account-balance";
import { User } from "src/domain/user/user.entity";

export interface updateBalance {
    user_id:User,
    balance:number
}

export interface updateBalancePaylaod {
    user_id:User,
    balance:Balance
}