import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindByProductIdQuery} from "../queries/findByProductId.query";
import {InjectRepository} from "@nestjs/typeorm";
import {ReviewEntity} from "../../common/entities/review.entity";
import {Repository} from "typeorm";

@QueryHandler(FindByProductIdQuery)
export class FindByProductIdHandler implements IQueryHandler<FindByProductIdQuery> {
  constructor(@InjectRepository(ReviewEntity) private readonly repository: Repository<ReviewEntity>) {
  }

  async execute(query: FindByProductIdQuery): Promise<ReviewEntity[]> {
    const {productId} = query;
    return await this.repository.findBy({productId});
  }
}
