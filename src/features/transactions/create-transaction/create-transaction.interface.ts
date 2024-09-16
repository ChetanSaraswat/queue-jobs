import { TransactionType } from "src/domain/bank/enum/transaction-type.enum";
import { User } from "src/domain/user/user.entity";

export interface CreateTransaction {
    transaction_type : TransactionType
    amount : number,
    credited_user_id : User,
    debited_user_id : User,
    balance_after_transaction:number,
    credited_bank_account:string,
    debited_bank_account:string, 
}





