import { Injectable } from "@nestjs/common";
import { User } from "src/domain/user/user.entity";
import { CreateUser } from "src/features/user/create-user/create-user.interface";
import { DataSource,  Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(
      private dataSource: DataSource
    ) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(payload: CreateUser,transaction=null):Promise<User> {
      if(transaction) {
        return  await transaction.save(User,payload)
      }
      return await this.save(payload) 
    }

}