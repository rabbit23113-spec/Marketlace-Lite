import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateEventCommand} from "../commands/createEvent.command";
import {InjectRepository} from "@nestjs/typeorm";
import {EventEntity} from "../../common/entities/event.entity";
import {Repository} from "typeorm";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(CreateEventCommand)
export class CreateEventHandler implements ICommandHandler<CreateEventCommand> {
  constructor(
    @InjectRepository(EventEntity) private repository: Repository<EventEntity>,
    private pino: PinoLogger,
  ) {
  }

  async execute(command: CreateEventCommand): Promise<void> {
    const {dto} = command;
    const event: EventEntity = this.repository.create(dto);
    await this.repository.save(event);
    this.pino.info("NEW EVENT", event);
  }
}
