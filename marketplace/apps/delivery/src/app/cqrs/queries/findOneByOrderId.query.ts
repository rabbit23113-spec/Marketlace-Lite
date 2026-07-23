import {DeliveryEntity} from "../../common/entities/delivery.entity";
import {Query} from "@nestjs/cqrs";

export class FindOneByOrderIdQuery extends Query<DeliveryEntity> {
  constructor(public readonly orderId: string) {
    super();
  }
}
