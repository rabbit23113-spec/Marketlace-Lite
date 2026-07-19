import {Query} from "@nestjs/cqrs";
import {CartEntity} from "../../common/entities/cart.entity";

export class FindOneByIdQuery extends Query<CartEntity> {
  constructor(public readonly cartId: string) {
    super();
  }
}
