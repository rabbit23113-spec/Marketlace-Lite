import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CartEntity} from "./common/entities/cart.entity";
import {FindOneByIdQuery} from "./cqrs/queries/findOneById.query";
import {FindOneByUserIdQuery} from "./cqrs/queries/findOneByUserId.query";
import {CreateCartCommand} from "./cqrs/commands/createCart.command";
import {AddProductCommand} from "./cqrs/commands/addProduct.command";
import {RemoveProductCommand} from "./cqrs/commands/removeProduct.command";

@Injectable()
export class AppService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {
  }

  async findOneById(cartId: string): Promise<CartEntity> {
    return await this.queryBus.execute(new FindOneByIdQuery(cartId));
  }

  async findOneByUserId(userId: string): Promise<CartEntity> {
    return await this.queryBus.execute(new FindOneByUserIdQuery(userId));
  }

  async createCart(userId: string): Promise<CartEntity> {
    return await this.commandBus.execute(new CreateCartCommand(userId));
  }

  async addProduct(cartId: string, productId: string): Promise<void> {
    await this.commandBus.execute(new AddProductCommand(cartId, productId));
  }

  async removeProduct(cartId: string, productId: string): Promise<CartEntity> {
    return await this.commandBus.execute(new RemoveProductCommand(cartId, productId));
  }
}
