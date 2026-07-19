import {Command} from "@nestjs/cqrs";

export class AddProductCommand extends Command<void> {
  constructor(public readonly cartId: string, public readonly productId: string) {
    super();
  }
}
