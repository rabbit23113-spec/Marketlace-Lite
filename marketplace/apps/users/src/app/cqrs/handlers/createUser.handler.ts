import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateUserCommand} from "../commands/createUser.command";
import {Repository} from "typeorm";
import {UserEntity} from "../../common/entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {
  }

  async execute(command: CreateUserCommand): Promise<UserEntity> {
    const {dto} = command;
    const user = this.repository.create(dto);
    await this.repository.save(user);
    return user;
  }
}
