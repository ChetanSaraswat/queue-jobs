import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CreateTransactionHandler } from './create-transaction/create-transaction.service';
import { CreateTransactionController } from './create-transaction/create-transaction.controller';
import { TransactionRepository } from 'src/infrastructure/repositories/account/transaction.repository';
import { AccountRepository } from 'src/infrastructure/repositories/account/account.repository';
import { TransactionProcessor } from 'src/infrastructure/queues-jobs/transaction.processor';
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
    AccountRepository,
    TransactionRepository],
  exports: [],
})
export class TransactionModule {}
