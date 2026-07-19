import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {ResetCartCommand} from "../commands/resetCart.command";
import {InjectRepository} from "@nestjs/typeorm";
import {CartEntity} from "../../common/entities/cart.entity";
import {Repository} from "typeorm";
import {NotFoundException} from "@nestjs/common";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(ResetCartCommand)
export class ResetCartHandler implements ICommandHandler<ResetCartCommand> {
  constructor(
    @InjectRepository(CartEntity) private repository: Repository<CartEntity>,
    private pino: PinoLogger,
  ) {
  }

  async execute(command: ResetCartCommand): Promise<CartEntity> {
    const {cartId} = command;
    const cart: CartEntity | null = await this.repository.findOneBy({cartId});
    if (!cart) throw new NotFoundException("Cart not found");

    await this.repository.update(cartId, {productIds: []})
    this.pino.info("CART RESET", cart);
    return cart;
  }
}
