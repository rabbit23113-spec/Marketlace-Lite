import {CartEntity} from "../../common/entities/cart.entity";
import {Command} from "@nestjs/cqrs";

export class CreateCartCommand extends Command<CartEntity> {
  constructor(public readonly userId: string) {
    super();
  }
}
