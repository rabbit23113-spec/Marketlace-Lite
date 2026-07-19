import {Command} from "@nestjs/cqrs";
import {CartEntity} from "../../common/entities/cart.entity";

export class AddProductCommand extends Command<CartEntity> {
  constructor(public readonly cartId: string, public readonly productId: string) {
    super();
  }
}
