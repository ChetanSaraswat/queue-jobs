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
      return await this.userRepository.createUser(userPayload);
    } catch (error) {
      throw error;
    }
  }
}