import { Module } from '@nestjs/common';
import { CreateUserHandler } from './create-user/create-user.service';
import { CreateUserController } from './create-user/create-user.controller';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
@Module({
  controllers:[ CreateUserController],
  imports: [],
  providers: [
    CreateUserHandler,
    UserRepository],
  exports: [],
})
export class UsersModule {}
