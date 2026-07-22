import {DeleteCartCommand} from "../commands/deleteCart.command";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {CartEntity} from "../../common/entities/cart.entity";
import {Repository} from "typeorm";
import {PinoLogger} from "nestjs-pino";
import {Inject} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";

@CommandHandler(DeleteCartCommand)
export class DeleteCartHandler implements ICommandHandler<DeleteCartCommand> {
  constructor(
    @InjectRepository(CartEntity) private repository: Repository<CartEntity>,
    private pino: PinoLogger,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
  ) {
  }

  async execute(command: DeleteCartCommand): Promise<void> {
    const {userId} = command;
    const cart: CartEntity | null = await this.repository.findOneBy({userId});
    if (cart) {
      await this.repository.delete(cart);
      this.eventsClient.emit("events.create", {domain: "CARTS", action: "DELETED", payload: cart});
      this.pino.info(`CART WITH ID ${cart.cartId} DELETED`);
    }
  }
}
