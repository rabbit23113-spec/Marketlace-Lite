import {OrderEntity} from "../../common/entities/order.entity";
import {Query} from "@nestjs/cqrs";

export class FindByUserIdQuery extends Query<OrderEntity[]> {
  constructor(public readonly userId: string) {
    super();
  }
}
