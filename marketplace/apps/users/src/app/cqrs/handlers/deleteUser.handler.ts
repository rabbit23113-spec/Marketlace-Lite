import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteUserCommand} from "../commands/deleteUser.command";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../../common/entities/user.entity";
import {Repository} from "typeorm";
import {Inject, NotFoundException} from "@nestjs/common";
import {PinoLogger} from "nestjs-pino";
import {ClientProxy} from "@nestjs/microservices";

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
    @Inject("CARTS_CLIENT") private cartsClient: ClientProxy,
    private pino: PinoLogger,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
  ) {
  }

  async execute(command: DeleteUserCommand): Promise<void> {
    const {userId} = command;
    const user: UserEntity | null = await this.repository.findOneBy({userId});
    if (!user) throw new NotFoundException("User does not exist");
    await this.repository.delete(userId);
    this.cartsClient.emit("carts.delete", {userId});
    this.pino.info(`USER WITH ID ${userId} DELETED`)
    this.eventsClient.emit("events.create", {domain: "USERS", action: "DELETED", payload: user})
  }
}
