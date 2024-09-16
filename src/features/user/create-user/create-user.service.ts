import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUser } from "./create-user.interface";
import { UserRepository } from "src/infrastructure/repositories/user/user.repository";
import { User } from "src/domain/user/user.entity";

@Injectable()
export class CreateUserHandler {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async handle(
    userPayload: CreateUser,
  ): Promise<User> {
    try {
     const user = await this.userRepository.createUser(userPayload);
     return user
    } catch (error) {
      throw error;
    }
  }
}