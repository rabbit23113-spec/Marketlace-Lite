import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindOneByIdQuery} from "../queries/findOneById.query";
import {InjectRepository} from "@nestjs/typeorm";
import {CartEntity} from "../../common/entities/cart.entity";
import {Repository} from "typeorm";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(FindOneByIdQuery)
export class FindOneByIdHandler implements IQueryHandler<FindOneByIdQuery> {
  constructor(@InjectRepository(CartEntity) private repository: Repository<CartEntity>) {
  }

  async execute(query: FindOneByIdQuery): Promise<CartEntity> {
    const {cartId} = query;
    const cart: CartEntity | null = await this.repository.findOneBy({cartId});
    if (!cart) throw new NotFoundException("Cart not found");
    return cart;
  }
}
