import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateUserCommand} from "../commands/createUser.command";
import {Repository} from "typeorm";
import {UserEntity} from "../../common/entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Inject} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
    @Inject("CARTS_CLIENT") private cartsClient: ClientProxy,
  ) {
  }

  async execute(command: CreateUserCommand): Promise<UserEntity> {
    const {dto} = command;
    const user = this.repository.create(dto);
    await this.repository.save(user);
    const cart = await firstValueFrom(this.cartsClient.send("carts.create", {userId: user.userId}));
    return user;
  }
}
