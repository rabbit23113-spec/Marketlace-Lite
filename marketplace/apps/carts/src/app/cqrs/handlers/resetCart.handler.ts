import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {ResetCartCommand} from "../commands/resetCart.command";
import {InjectRepository} from "@nestjs/typeorm";
import {CartEntity} from "../../common/entities/cart.entity";
import {Repository} from "typeorm";
import {Inject, NotFoundException} from "@nestjs/common";
import {PinoLogger} from "nestjs-pino";
import {ClientProxy} from "@nestjs/microservices";

@CommandHandler(ResetCartCommand)
export class ResetCartHandler implements ICommandHandler<ResetCartCommand> {
  constructor(
    @InjectRepository(CartEntity) private repository: Repository<CartEntity>,
    private pino: PinoLogger,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
  ) {
  }

  async execute(command: ResetCartCommand): Promise<CartEntity> {
    const {cartId} = command;
    const cart: CartEntity | null = await this.repository.findOneBy({cartId});
    if (!cart) throw new NotFoundException("Cart not found");

    await this.repository.update(cartId, {productIds: []})
    this.pino.info("CART RESET", cart);
    this.eventsClient.emit("events.create", {domain: "CARTS", action: "RESET", payload: cart});
    return cart;
  }
}
