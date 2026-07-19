import {Query} from "@nestjs/cqrs";
import {CartEntity} from "../../common/entities/cart.entity";

export class FindOneByUserIdQuery extends Query<CartEntity> {
  constructor(public userId: string) {
    super();
  }
}
