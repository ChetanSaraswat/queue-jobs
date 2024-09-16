import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateAccount, CreateAccountPayload } from "./create-account.interface";
import { Account } from "src/domain/account/account.entity";
import { AccountRepository } from "src/infrastructure/repositories/account/account.repository";
import { Balance } from "src/domain/account/account-balance";
@Injectable()
export class CreateAccountHandler {
  constructor(
    @InjectRepository(AccountRepository)
    private AccountRepository: AccountRepository,
  ) {}

  public async handle(
    accountPayload: CreateAccountPayload
  ): Promise<Account> {
    try {
      const validBalance:Balance = new Balance(accountPayload?.balance);
      const validAccountPayload:CreateAccount= {
        ...accountPayload,
        balance:validBalance
      }
      return await this.AccountRepository.createAccount(validAccountPayload);
    } catch (error) {
      throw error;
    }
  }
}