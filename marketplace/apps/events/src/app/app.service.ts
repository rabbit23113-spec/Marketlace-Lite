import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {EventEntity} from "./common/entities/event.entity";
import {FindAllQuery} from "./cqrs/queries/findAll.query";

@Injectable()
export class AppService {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {
  }

  async findAll(): Promise<EventEntity[]> {
    return await this.queryBus.execute(new FindAllQuery());
  }
}
