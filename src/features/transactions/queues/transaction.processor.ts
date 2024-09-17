import { Processor, Process, OnQueueCompleted, OnQueueFailed } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionRepository } from 'src/infrastructure/repositories/account/transaction.repository';
import { dataSource } from 'ormconfig';
import { TransactionType } from 'src/domain/account/enum/transaction-type.enum';
import { InsufficientBalanceException } from 'src/infrastructure/exception/custom-exception';
import { AccountRepository } from 'src/infrastructure/repositories/account/account.repository';
import { CreateTransaction } from '../create-transaction/create-transaction.interface';
import { Balance } from 'src/domain/account/account-balance';
@Processor('transaction-queue')
@Injectable()
export class TransactionProcessor {
    constructor(
        @InjectRepository(AccountRepository )
        private AccountRepository: AccountRepository,
        @InjectRepository(TransactionRepository)
        private transactionRepository:TransactionRepository
      ) {}
    
  @Process('transaction-job')
  async handleTaskJob(job: Job) {
        const { amount: amount, user_id: debit_user_id ,receiver_id: credit_user_id ,description} = job.data || {};
        const debit_bank_details = await this.AccountRepository.findByUuid(debit_user_id);
        const balanceValue = debit_bank_details.balance.getValue()
        const credit_bank_details = await this.AccountRepository.findByUuid(credit_user_id);
        if(balanceValue > amount){
            const debitPayload= {
                balance : Balance.subtract(debit_bank_details?.balance,Number(amount)),
                user_id : debit_user_id
            }
            const creditPayload= {
                balance : Balance.add(credit_bank_details?.balance,Number(amount)), 
                user_id : credit_user_id
            }
            return await dataSource.transaction(async transaction => {
            await this.AccountRepository.updateAccountBalance(debitPayload,transaction)
            await this.AccountRepository.updateAccountBalance(creditPayload,transaction)
            const debitTransactionData:CreateTransaction={
                transaction_type : TransactionType.DEBIT,
                amount : amount,
                description:description,
                credited_user_id : credit_user_id,
                debited_user_id : debit_user_id,
                balance_after_transaction:debitPayload?.balance.getValue(),
                credited_bank_account:credit_bank_details?.account_number,
                debited_bank_account:debit_bank_details?.account_number, 
            }
            await this.transactionRepository.createTransaction(debitTransactionData,transaction)
            
            const creditTransactionData:CreateTransaction={
                transaction_type : TransactionType.CREDIT,
                amount : amount,
                description:description,
                credited_user_id : credit_user_id,
                debited_user_id : debit_user_id,
                balance_after_transaction:creditPayload?.balance.getValue(),
                credited_bank_account:credit_bank_details?.account_number,
                debited_bank_account:debit_bank_details?.account_number,
            }
            return await this.transactionRepository.createTransaction(creditTransactionData,transaction)
        })}
         else{
            throw new InsufficientBalanceException();
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
