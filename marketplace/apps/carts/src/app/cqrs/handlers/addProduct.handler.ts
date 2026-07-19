import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {AddProductCommand} from "../commands/addProduct.command";
import {InjectRepository} from "@nestjs/typeorm";
import {CartEntity} from "../../common/entities/cart.entity";
import {Repository} from "typeorm";
import {Inject, NotFoundException} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(AddProductCommand)
export class AddProductHandler implements ICommandHandler<AddProductCommand> {
  constructor(
    @InjectRepository(CartEntity) private repository: Repository<CartEntity>,
    @Inject("PRODUCTS_CLIENT") private productsClient: ClientProxy,
    private pino: PinoLogger,
  ) {
  }

  async execute(command: AddProductCommand): Promise<CartEntity> {
    const {cartId, productId} = command;
    const cart: CartEntity | null = await this.repository.findOneBy({cartId});
    if (!cart) throw new NotFoundException("Cart not found");
    const product = await firstValueFrom(this.productsClient.send("products.findOneById", {productId}));
    if (!product) throw new NotFoundException("Product not found");
    const newProductIds: string[] = [...cart.productIds, productId];
    await this.repository.update(cartId, {productIds: newProductIds});
    this.pino.info(`PRODUCT WITH ID ${productId} ADDED TO THE CART`, cart);
    return cart;
  }
}
