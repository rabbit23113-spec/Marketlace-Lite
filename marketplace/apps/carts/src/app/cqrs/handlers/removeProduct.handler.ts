import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {RemoveProductCommand} from "../commands/removeProduct.command";
import {InjectRepository} from "@nestjs/typeorm";
import {CartEntity} from "../../common/entities/cart.entity";
import {Repository} from "typeorm";
import {BadRequestException, NotFoundException} from "@nestjs/common";

@CommandHandler(RemoveProductCommand)
export class RemoveProductHandler implements ICommandHandler<RemoveProductCommand> {
  constructor(@InjectRepository(CartEntity) private repository: Repository<CartEntity>) {
  }

  async execute(command: RemoveProductCommand): Promise<CartEntity> {
    const {cartId, productId} = command;
    const cart: CartEntity | null = await this.repository.findOneBy({cartId});
    if (!cart) throw new NotFoundException("Cart not found");
    if (!cart.productIds.length) throw new BadRequestException("Cart is empty");
    if (!cart.productIds.includes(productId)) throw new BadRequestException("There is no product in the cart");

    const newProductIds: string[] = cart.productIds.filter((id: string) => id !== productId);
    await this.repository.update(cartId, {productIds: newProductIds});
    return cart;
  }
}
