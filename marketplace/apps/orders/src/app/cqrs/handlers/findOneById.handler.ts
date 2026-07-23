import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindOneByIdQuery} from "../queries/findOneById.query";
import {InjectRepository} from "@nestjs/typeorm";
import {OrderEntity} from "../../common/entities/order.entity";
import {Repository} from "typeorm";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(FindOneByIdQuery)
export class FindOneByIdHandler implements IQueryHandler<FindOneByIdQuery> {
  constructor(@InjectRepository(OrderEntity) private readonly repository: Repository<OrderEntity>) {
  }

  async execute(query: FindOneByIdQuery): Promise<OrderEntity> {
    const {orderId} = query;
    const order: OrderEntity | null = await this.repository.findOneBy({orderId});
    if (!order) throw new NotFoundException("Order not found");

    return order;
  }
}
