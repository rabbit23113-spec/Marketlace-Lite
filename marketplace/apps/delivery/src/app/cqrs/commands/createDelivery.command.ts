import {CreateDeliveryDto} from "../../common/dto/createDelivery.dto";
import {Command} from "@nestjs/cqrs";
import {DeliveryEntity} from "../../common/entities/delivery.entity";

export class CreateDeliveryCommand extends Command<DeliveryEntity> {
  constructor(public readonly dto: CreateDeliveryDto) {
    super();
  }
}
