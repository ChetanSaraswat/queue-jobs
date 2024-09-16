import { Injectable } from "@nestjs/common";
import { Account } from "src/domain/account/account.entity";
import { CreateAccount } from "src/features/account/create-account/create-account.interface";
import { updateBalance } from "src/features/account/update-account/update-account.interface";
import { DataSource,  Repository } from "typeorm";

@Injectable()
export class BankAccountRepository extends Repository<Account> {
    constructor(
      private dataSource: DataSource
    ) {
        super(Account, dataSource.createEntityManager());
    }

    async createBankAccount(payload: CreateAccount,transaction=null):Promise<Account> {
      if(transaction) {
        return  await transaction.save(Account,payload)
      }
      return await this.save(payload) 
    }

   async findByUuid(user_id): Promise<Account> {
        return  await this.createQueryBuilder('bank_account')
        .where('bank_account.user_id = :user_id', { user_id })
        .getOne();
    }

    async updateBankBalance(payload: updateBalance, transaction = null){
        const { user_id, balance } = payload;
        if (transaction) {
          return await transaction.update(Account, { user_id: user_id }, { balance });
        }    
        return await this.update({ user_id } , { balance });
      }
    }

