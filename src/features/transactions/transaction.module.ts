import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CreateTransactionHandler } from './create-transaction/create-transaction.service';
import { TransactionProcessor } from './queues/transaction.processor';
import { CreateTransactionController } from './create-transaction/create-transaction.controller';
import { BankAccountRepository } from 'src/infrastructure/repositories/bank/bank.repository';
import { TransactionLogRepository } from 'src/infrastructure/repositories/transaction/transaction.repository';
@Module({
    controllers:[CreateTransactionController],
  imports: [
    BullModule.registerQueue({
      name: 'transaction-queue',
    }),
  ],
  providers: [
    CreateTransactionHandler,
    TransactionProcessor,
    BankAccountRepository,
    TransactionLogRepository],
  exports: [],
})
export class TransactionModule {}
