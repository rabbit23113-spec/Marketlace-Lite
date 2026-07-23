import {DeliveryEntity} from "../../common/entities/delivery.entity";
import {UpdateDeliveryDto} from "../../common/dto/updateDelivery.dto";
import {Command} from "@nestjs/cqrs";

export class UpdateDeliveryCommand extends Command<DeliveryEntity> {
  constructor(public readonly deliveryId: string, public readonly dto: UpdateDeliveryDto) {
    super();
  }
}
