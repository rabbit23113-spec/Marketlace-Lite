import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {DeliveryEntity} from "./common/entities/delivery.entity";
import {FindOneByOrderIdQuery} from "./cqrs/queries/findOneByOrderId.query";

@Injectable()
export class AppService {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  async findOneByOrderId(orderId: string): Promise<DeliveryEntity> {
    return await this.queryBus.execute(new FindOneByOrderIdQuery(orderId));
  }
}
