import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateUserCommand} from "../commands/updateUser.command";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../../common/entities/user.entity";
import {Repository} from "typeorm";
import {Inject, NotFoundException} from "@nestjs/common";
import {PinoLogger} from "nestjs-pino";
import {ClientProxy} from "@nestjs/microservices";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
    private pino: PinoLogger,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
  ) {
  }

  async execute(command: UpdateUserCommand): Promise<UserEntity> {
    const {userId, dto} = command;
    const user: UserEntity | null = await this.repository.findOneBy({userId});
    if (!user) throw new NotFoundException("User does not exist");

    await this.repository.update(userId, dto);
    this.pino.info(`USER UPDATED`, user);
    this.eventsClient.emit("events.create", {domain: "USERS", action: "UPDATED", payload: user})
    return user;
  }
}
