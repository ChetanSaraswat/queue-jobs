import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "src/domain/user/user.entity";
export class CreateAccountCommand {
    
    @IsString()
    @IsNotEmpty()
    bank_name:string
  
    @IsString()
    description: string;

    @IsString()
    @IsNotEmpty()
    user_id:User;

    @IsNumber()
    @IsNotEmpty()
    balance:number;
  }

