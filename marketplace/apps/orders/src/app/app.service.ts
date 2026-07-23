import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {OrderEntity} from "./common/entities/order.entity";
import {FindByUserIdQuery} from "./cqrs/queries/findByUserId.query";

@Injectable()
export class AppService {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  async findByUserId(userId: string): Promise<OrderEntity[]> {
    return await this.queryBus.execute(new FindByUserIdQuery(userId));
  }
}
