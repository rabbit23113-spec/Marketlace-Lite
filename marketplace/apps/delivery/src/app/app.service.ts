import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {DeliveryEntity} from "./common/entities/delivery.entity";
import {FindOneByOrderIdQuery} from "./cqrs/queries/findOneByOrderId.query";
import {FindOneByIdQuery} from "./cqrs/queries/findOneById.query";

@Injectable()
export class AppService {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  async findOneById(deliveryId: string): Promise<DeliveryEntity> {
    return await this.queryBus.execute(new FindOneByIdQuery(deliveryId));
  }

  async findOneByOrderId(orderId: string): Promise<DeliveryEntity> {
    return await this.queryBus.execute(new FindOneByOrderIdQuery(orderId));
  }
}
