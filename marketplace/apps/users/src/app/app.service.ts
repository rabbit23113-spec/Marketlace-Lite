import {Injectable} from '@nestjs/common';
import {CreateUserDto} from "./common/dto/createUser.dto";
import {UserEntity} from "./common/entities/user.entity";
import {CreateUserCommand} from "./cqrs/commands/createUser.command";
import {CommandBus} from "@nestjs/cqrs";
import {UpdateUserDto} from "./common/dto/updateUser.dto";
import {UpdateUserCommand} from "./cqrs/commands/updateUser.command";
import {DeleteUserCommand} from "./cqrs/commands/deleteUser.command";

@Injectable()
export class AppService {
  constructor(private commandBus: CommandBus) {
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
