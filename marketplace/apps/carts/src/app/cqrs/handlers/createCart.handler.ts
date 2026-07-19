import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateCartCommand} from "../commands/createCart.command";
import {InjectRepository} from "@nestjs/typeorm";
import {CartEntity} from "../../common/entities/cart.entity";
import {Repository} from "typeorm";
import {Inject, NotFoundException} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(CreateCartCommand)
export class CreateCartHandler implements ICommandHandler<CreateCartCommand> {
  constructor(
    @InjectRepository(CartEntity) private repository: Repository<CartEntity>,
    @Inject("USERS_CLIENT") private usersClient: ClientProxy,
    private pino: PinoLogger,
    ) {
  }

  async execute(command: CreateCartCommand): Promise<CartEntity> {
    const {userId} = command;
    const user = await firstValueFrom(this.usersClient.send("users.findOneById", {userId}));
    if (!user) throw new NotFoundException("User not found");
    const cart: CartEntity = this.repository.create({userId});
    await this.repository.save(cart);
    this.pino.info("CART CREATED", cart);
    return cart;
  }
}
