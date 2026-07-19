import {DeleteCartCommand} from "../commands/deleteCart.command";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {CartEntity} from "../../common/entities/cart.entity";
import {Repository} from "typeorm";

@CommandHandler(DeleteCartCommand)
export class DeleteCartHandler implements ICommandHandler<DeleteCartCommand> {
  constructor(@InjectRepository(CartEntity) private repository: Repository<CartEntity>) {
  }

  async execute(command: DeleteCartCommand): Promise<void> {
    const {userId} = command;
    const cart: CartEntity | null = await this.repository.findOneBy({userId});
    if (cart) {
      await this.repository.delete(cart);
    }
  }
}
