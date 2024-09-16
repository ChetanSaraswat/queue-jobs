import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BankAccountRepository } from "src/infrastructure/repositories/bank/bank.repository";
import { Account } from "src/domain/bank/bank.entity";
import { CreateAccount } from "./create-account.interface";

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
     const bankAccount = await this.bankAccountRepository.createBankAccount(bankPayload);
     return bankAccount
    } catch (error) {
      throw error;
    }
  }
}