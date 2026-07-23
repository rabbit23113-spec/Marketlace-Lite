import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {DeliveryEntity} from "./common/entities/delivery.entity";
import {FindOneByOrderIdQuery} from "./cqrs/queries/findOneByOrderId.query";
import {FindOneByIdQuery} from "./cqrs/queries/findOneById.query";
import {CreateDeliveryDto} from "./common/dto/createDelivery.dto";
import {CreateDeliveryCommand} from "./cqrs/commands/createDelivery.command";

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

  async create(dto: CreateDeliveryDto): Promise<DeliveryEntity> {
    return await this.commandBus.execute(new CreateDeliveryCommand(dto));
  }
}
