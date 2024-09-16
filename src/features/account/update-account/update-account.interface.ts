import { User } from "src/domain/user/user.entity";

export interface updateBalance {
    user_id:User,
    balance:number
}
