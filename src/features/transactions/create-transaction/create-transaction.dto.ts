import {  IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "src/domain/user/user.entity";
export class CreateTransactionCommand {
   
    @IsString()
    description: string;
    
    @IsString()
    @IsNotEmpty()
    receiver_id:User;

    @IsNumber()
    @IsNotEmpty()
    amount:number;
  }
