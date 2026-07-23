import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {OrderEntity} from "./common/entities/order.entity";
import {FindByUserIdQuery} from "./cqrs/queries/findByUserId.query";
import {FindOneByIdQuery} from "./cqrs/queries/findOneById.query";

@Injectable()
export class AppService {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  async findOneById(orderId: string): Promise<OrderEntity> {
    return await this.queryBus.execute(new FindOneByIdQuery(orderId));
  }

  async findByUserId(userId: string): Promise<OrderEntity[]> {
    return await this.queryBus.execute(new FindByUserIdQuery(userId));
  }
}
