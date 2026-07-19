import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {CartEntity} from "../../common/entities/cart.entity";
import {Repository} from "typeorm";
import {FindOneByUserIdQuery} from "../queries/findOneByUserId.query";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(FindOneByUserIdQuery)
export class FindOneByUserIdHandler implements IQueryHandler<FindOneByUserIdQuery> {
  constructor(@InjectRepository(CartEntity) private repository: Repository<CartEntity>) {
  }

  async execute(query: FindOneByUserIdQuery): Promise<CartEntity> {
    const {userId} = query;
    const cart: CartEntity | null = await this.repository.findOneBy({userId});
    if (!cart) throw new NotFoundException("Cart not found");
    return cart;
  }
}
