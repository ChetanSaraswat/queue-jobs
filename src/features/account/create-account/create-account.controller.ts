import { Body, Controller, HttpStatus, Post, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { handleError } from "src/infrastructure/exception/custom-exception";
import { CreateBankAccountHandler } from "./create-account.service";
import { CreateAccountCommand} from "./create-account.dto";

@Controller('/')
export class CreateBankAccountController {
  constructor(
     private readonly createBankAccountHandler: CreateBankAccountHandler, 
  ) {}

  @Post('create-bank-account')
  public async handle(
    @Body() body: CreateAccountCommand,
    @Res() res: Response,
  ) {
    try {
      const response =await this.createBankAccountHandler.handle(body)
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.log('Error during adding bank details', error);
      return handleError(res, error);
    }
  }
}