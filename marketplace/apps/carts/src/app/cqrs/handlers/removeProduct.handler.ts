import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {RemoveProductCommand} from "../commands/removeProduct.command";
import {InjectRepository} from "@nestjs/typeorm";
import {CartEntity} from "../../common/entities/cart.entity";
import {Repository} from "typeorm";
import {BadRequestException, Inject, NotFoundException} from "@nestjs/common";
import {PinoLogger} from "nestjs-pino";
import {ClientProxy} from "@nestjs/microservices";

@CommandHandler(RemoveProductCommand)
export class RemoveProductHandler implements ICommandHandler<RemoveProductCommand> {
  constructor(
    @InjectRepository(CartEntity) private repository: Repository<CartEntity>,
    private pino: PinoLogger,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
  ) {
  }

  async execute(command: RemoveProductCommand): Promise<CartEntity> {
    const {cartId, productId} = command;
    const cart: CartEntity | null = await this.repository.findOneBy({cartId});
    if (!cart) throw new NotFoundException("Cart not found");
    if (!cart.productIds.length) throw new BadRequestException("Cart is empty");
    if (!cart.productIds.includes(productId)) throw new BadRequestException("There is no product in the cart");
    const newProductIds: string[] = cart.productIds.filter((id: string) => id !== productId);
    await this.repository.update(cartId, {productIds: newProductIds});
    this.pino.info(`PRODUCT WITH ID ${productId} DELETED FROM CART`, cart);
    this.eventsClient.emit("events.create", {domain: "CARTS", action: "REMOVE PRODUCT", payload: cart});
    return cart;
  }
}
