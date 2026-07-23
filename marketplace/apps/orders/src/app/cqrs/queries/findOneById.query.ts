import {OrderEntity} from "../../common/entities/order.entity";
import {Query} from "@nestjs/cqrs";

export class FindOneByIdQuery extends Query<OrderEntity> {
  constructor(public readonly orderId: string) {
    super();
  }
}
