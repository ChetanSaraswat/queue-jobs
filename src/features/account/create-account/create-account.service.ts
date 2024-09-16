import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BankAccountRepository } from "src/infrastructure/repositories/account/bank.repository";
import { CreateAccount } from "./create-account.interface";
import { Account } from "src/domain/account/account.entity";
@Injectable()
export class CreateBankAccountHandler {
  constructor(
    @InjectRepository(BankAccountRepository)
    private bankAccountRepository: BankAccountRepository,
  ) {}

  public async handle(
    bankPayload: CreateAccount
  ): Promise<Account> {
    try {
     return await this.bankAccountRepository.createBankAccount(bankPayload);
    } catch (error) {
      throw error;
    }
  }
}