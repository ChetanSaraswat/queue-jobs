import { Body, Controller, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { handleError } from "src/infrastructure/exception/custom-exception";
import { CreateTransactionCommand } from "./create-transaction.dto";
import { CreateTransactionHandler } from "./create-transaction.service";
@Controller('/')
export class CreateTransactionController {
  constructor(
     private readonly createTransactionHandler: CreateTransactionHandler, 
  ) {}

  @Post('create-transaction/:user_id')
  public async handle(
    @Body() body: CreateTransactionCommand,
    @Param('user_id') user_id: string, 
    @Res() res: Response,
  ) {
    try {
      const response =await this.createTransactionHandler.handle(body , user_id)
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.log('Error during adding transaction details', error);
      return handleError(res, error);
    }
  }
}