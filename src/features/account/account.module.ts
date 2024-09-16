import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CreateBankAccountController } from './create-account/create-account.controller';
import { CreateBankAccountHandler } from './create-account/create-account.service';
import { BankAccountRepository } from 'src/infrastructure/repositories/bank/bank.repository';


@Module({
  controllers:[ CreateBankAccountController],
  imports: [],
  providers: [
    CreateBankAccountHandler,
    BankAccountRepository],
  exports: [],
})
export class AccountModule {}
