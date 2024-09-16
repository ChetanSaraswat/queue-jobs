import { Injectable } from "@nestjs/common";
import { CreateTransactionCommand } from "./create-transaction.dto";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
@Injectable()
export class CreateTransactionHandler {
  constructor(
    @InjectQueue('transaction-queue') private transactionQueue: Queue
  ) {}

  public async handle(
    transactionPayload: CreateTransactionCommand,
    user_id:string
  ) {
    try {
       return await this.transactionQueue.add('transaction-job', {transactionPayload,user_id});
    } catch (error) {
      console.log('error: ', error);
       throw error;
    }
  }
}