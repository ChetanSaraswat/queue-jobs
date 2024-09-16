import { Injectable } from "@nestjs/common";
import { Transaction } from "src/domain/account/transaction.entity";
import { CreateTransaction } from "src/features/transactions/create-transaction/create-transaction.interface";
import { DataSource,  Repository } from "typeorm";
@Injectable()
export class TransactionRepository extends Repository<Transaction> {
    constructor(
      private dataSource: DataSource
    ) {
        super(Transaction, dataSource.createEntityManager());
    }

    async createTransaction(payload: CreateTransaction,transaction=null):Promise<Transaction> {
      if(transaction) {
        return  await transaction.save(Transaction,payload)
      }
      return await this.save(payload) 
    }
}