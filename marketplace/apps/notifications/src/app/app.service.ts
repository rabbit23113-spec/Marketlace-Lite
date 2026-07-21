import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {NotificationEntity} from "./common/entities/notification.entity";
import {FindAllQuery} from "./cqrs/queries/findAll.query";

@Injectable()
export class AppService {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  async findAll(): Promise<NotificationEntity[]> {
    return await this.queryBus.execute(new FindAllQuery());
  }
}
