import {Injectable} from '@nestjs/common';
import {CreateUserDto} from "./common/dto/createUser.dto";
import {UserEntity} from "./common/entities/user.entity";
import {CreateUserCommand} from "./cqrs/commands/createUser.command";
import {CommandBus} from "@nestjs/cqrs";

@Injectable()
export class AppService {
  constructor(private commandBus: CommandBus) {
  }

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    return await this.commandBus.execute(new CreateUserCommand(dto));
  }
}
