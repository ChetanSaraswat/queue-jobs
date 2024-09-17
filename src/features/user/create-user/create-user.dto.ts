import { IsNotEmpty, IsString } from "class-validator";
export class CreateUserCommand {
    
    @IsString()
    @IsNotEmpty()
    name:string
  
    @IsString()
    @IsNotEmpty()
    email: string;
  }