import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CartEntity} from "./common/entities/cart.entity";
import {FindOneByIdQuery} from "./cqrs/queries/findOneById.query";

@Injectable()
export class AppService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {
  }

  async findOneById(cartId: string): Promise<CartEntity> {
    return await this.queryBus.execute(new FindOneByIdQuery(cartId));
  }
}
