import {DeliveryEntity} from "../../common/entities/delivery.entity";
import {Query} from "@nestjs/cqrs";

export class FindOneByIdQuery extends Query<DeliveryEntity> {
  constructor(public readonly deliveryId: string) {
    super();
  }
}
