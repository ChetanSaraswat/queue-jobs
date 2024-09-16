import { Injectable } from "@nestjs/common";
import { Transaction } from "src/domain/bank/transaction.entity";
import { CreateTransaction } from "src/features/transactions/create-transaction/create-transaction.interface";
import { DataSource,  Repository } from "typeorm";

@Injectable()
export class TransactionLogRepository extends Repository<Transaction> {
    constructor(
      private dataSource: DataSource
    ) {
        super(Transaction, dataSource.createEntityManager());
    }

    async createTransactionLog(payload: CreateTransaction,transaction=null):Promise<Transaction> {
      if(transaction) {
        return  await transaction.save(Transaction,payload)
      }
      return await this.save(payload) 
    }

}