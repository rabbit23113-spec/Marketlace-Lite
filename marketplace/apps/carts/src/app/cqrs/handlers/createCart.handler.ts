import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateCartCommand} from "../commands/createCart.command";
import {InjectRepository} from "@nestjs/typeorm";
import {CartEntity} from "../../common/entities/cart.entity";
import {Repository} from "typeorm";
import {Inject} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(CreateCartCommand)
export class CreateCartHandler implements ICommandHandler<CreateCartCommand> {
  constructor(
    @InjectRepository(CartEntity) private repository: Repository<CartEntity>,
    private pino: PinoLogger,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
  ) {
  }

  async execute(command: CreateCartCommand): Promise<CartEntity> {
    const {userId} = command;
    const cart: CartEntity = this.repository.create({userId});
    await this.repository.save(cart);
    this.pino.info("CART CREATED", cart);
    this.eventsClient.emit("events.create", {domain: "CARTS", action: "CREATED", payload: cart});
    return cart;
  }
}
