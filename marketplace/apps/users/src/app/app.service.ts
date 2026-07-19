import {Injectable} from '@nestjs/common';
import {CreateUserDto} from "./common/dto/createUser.dto";
import {UserEntity} from "./common/entities/user.entity";
import {CreateUserCommand} from "./cqrs/commands/createUser.command";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {UpdateUserDto} from "./common/dto/updateUser.dto";
import {UpdateUserCommand} from "./cqrs/commands/updateUser.command";
import {DeleteUserCommand} from "./cqrs/commands/deleteUser.command";
import {FindOneByIdQuery} from "./cqrs/queries/findOneById.query";
import {FindOneByEmailQuery} from "./cqrs/queries/findOneByEmail.query";
import {FindManyQuery} from "./cqrs/queries/findMany.query";

@Injectable()
export class AppService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {
  }

  async findOneById(userId: string): Promise<UserEntity> {
    return await this.queryBus.execute(new FindOneByIdQuery(userId));
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.queryBus.execute(new FindOneByEmailQuery(email));
  }

  async findMany(): Promise<UserEntity[]> {
    return await this.queryBus.execute(new FindManyQuery());
  }

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    return await this.commandBus.execute(new CreateUserCommand(dto));
  }

  async updateUser(userId: string, dto: UpdateUserDto): Promise<UserEntity> {
    return await this.commandBus.execute(new UpdateUserCommand(userId, dto));
  }

  async deleteUser(userId: string): Promise<void> {
    return await this.commandBus.execute(new DeleteUserCommand(userId));
  }
}
