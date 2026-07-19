import {CartEntity} from "../../common/entities/cart.entity";
import {Command} from "@nestjs/cqrs";

export class ResetCartCommand extends Command<CartEntity> {
  constructor(public readonly cartId: string) {
    super();
  }
}
