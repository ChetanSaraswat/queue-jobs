import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { handleError } from "src/infrastructure/exception/custom-exception";
import { CreateAccountHandler } from "./create-account.service";
import { CreateAccountCommand} from "./create-account.dto";
@Controller('/')
export class CreateAccountController {
  constructor(
     private readonly createAccountHandler: CreateAccountHandler, 
  ) {}

  @Post('create-account')
  public async handle(
    @Body() body: CreateAccountCommand,
    @Res() res: Response,
  ) {
    try {
      const response =await this.createAccountHandler.handle(body)
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.log('Error during adding Account details', error);
      return handleError(res, error);
    }
  }
}