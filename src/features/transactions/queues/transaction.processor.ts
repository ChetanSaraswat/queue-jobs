import { Processor, Process, OnQueueCompleted, OnQueueFailed } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccountRepository } from 'src/infrastructure/repositories/bank/bank.repository';
import { TransactionType } from 'src/domain/bank/enum/transaction-type.enum';
import { TransactionLogRepository } from 'src/infrastructure/repositories/transaction/transaction.repository';
import { dataSource } from 'ormconfig';

@Processor('transaction-queue')
@Injectable()
export class TransactionProcessor {
    constructor(
        @InjectRepository(BankAccountRepository )
        private bankAccountRepository: BankAccountRepository,
        @InjectRepository(TransactionLogRepository)
        private transactionLogRepository:TransactionLogRepository
      ) {}
    
  @Process('transaction-log-job')
  async handleTaskJob(job: Job) {
        const data = job.data?.transactionPayload;
        const debit_user_id = job.data?.user_id;
        const credit_user_id=data?.receiver_id;
        const debit_bank_details = await this.bankAccountRepository.findByUuid(debit_user_id);
        const credit_bank_details = await this.bankAccountRepository.findByUuid(credit_user_id);
        if(debit_bank_details?.balance > data?.amount){
            const debitPayload= {
                balance : Number(debit_bank_details?.balance)-Number(data?.amount),
                user_id : debit_user_id
            }
            const creditPayload= {
                balance : Number(credit_bank_details?.balance) + Number(data?.amount),
                user_id : credit_user_id
            }
            return await dataSource.transaction(async transaction => {
            await this.bankAccountRepository.updateBankBalance(debitPayload,transaction)
            await this.bankAccountRepository.updateBankBalance(creditPayload,transaction)
            const debitTransactionlogData={
                transaction_type : TransactionType.DEBIT,
                amount : data?.amount,
                credited_user_id : credit_user_id,
                debited_user_id : debit_user_id,
                balance_after_transaction:debitPayload?.balance,
                credited_bank_account:credit_bank_details?.account_number,
                debited_bank_account:debit_bank_details?.account_number, 
            }
            await this.transactionLogRepository.createTransactionLog(debitTransactionlogData,transaction)
            
            const creditTransactionlogData={
                transaction_type : TransactionType.CREDIT,
                amount : data?.amount,
                credited_user_id : credit_user_id,
                debited_user_id : debit_user_id,
                balance_after_transaction:creditPayload?.balance,
                credited_bank_account:credit_bank_details?.account_number,
                debited_bank_account:debit_bank_details?.account_number,
            }
            return  await this.transactionLogRepository.createTransactionLog(creditTransactionlogData,transaction)
        })}
         else{
            throw new Error('Insufficient balance')
         }
  }
  @OnQueueCompleted()
  async onComplete(job: Job) {
      console.log(`Job ${job.id} completed successfully`);
  }
  @OnQueueFailed()
  async onFailed(job:Job){
    console.log(`Job ${job.failedReason} failed`);
  }
}
