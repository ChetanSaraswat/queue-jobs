import { Module } from '@nestjs/common';
import { CreateAccountController } from './create-account/create-account.controller';
import { CreateAccountHandler } from './create-account/create-account.service';
import { AccountRepository } from 'src/infrastructure/repositories/account/account.repository';

@Module({
  controllers:[ CreateAccountController],
  imports: [],
  providers: [
    CreateAccountHandler,
    AccountRepository],
  exports: [],
})
export class AccountModule {}
