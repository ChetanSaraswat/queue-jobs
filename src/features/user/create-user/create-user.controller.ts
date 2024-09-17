import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { handleError } from "src/infrastructure/exception/custom-exception";
import { CreateUserCommand } from "./create-user.dto";
import { CreateUserHandler } from "./create-user.service";
@Controller('/')
export class CreateUserController {
  constructor(
     private readonly createUserHandler: CreateUserHandler, 
  ) {}

  @Post('create-user')
  public async handle(
    @Body() body: CreateUserCommand,
    @Res() res: Response,
  ) {
    try {
      const response =await this.createUserHandler.handle(body)
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.log('Error during creating user', error);
      return handleError(res, error);
    }
  }
}