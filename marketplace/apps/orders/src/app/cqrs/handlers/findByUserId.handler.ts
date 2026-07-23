import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindByUserIdQuery} from "../queries/findByUserId.query";
import {InjectRepository} from "@nestjs/typeorm";
import {OrderEntity} from "../../common/entities/order.entity";
import {Repository} from "typeorm";

@QueryHandler(FindByUserIdQuery)
export class FindByUserIdHandler implements IQueryHandler<FindByUserIdQuery> {
  constructor(@InjectRepository(OrderEntity) private readonly repository: Repository<OrderEntity>) {
  }

  async execute(query: FindByUserIdQuery): Promise<OrderEntity[]> {
    const {userId} = query;
    return await this.repository.findBy({userId});
  }
}
