import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {EventEntity} from "./common/entities/event.entity";
import {FindAllQuery} from "./cqrs/queries/findAll.query";
import {CreateEventDto} from "./common/dto/createEvent.dto";
import {CreateEventCommand} from "./cqrs/commands/createEvent.command";

@Injectable()
export class AppService {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {
  }

  async findAll(): Promise<EventEntity[]> {
    return await this.queryBus.execute(new FindAllQuery());
  }

  async create(dto: CreateEventDto): Promise<void> {
    await this.commandBus.execute(new CreateEventCommand(dto));
  }
}
