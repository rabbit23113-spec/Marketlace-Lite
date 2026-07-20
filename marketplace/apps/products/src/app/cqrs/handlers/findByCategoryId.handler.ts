import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindByCategoryIdQuery} from "../queries/findByCategoryId.query";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductEntity} from "../../common/entities/product.entity";
import {Repository} from "typeorm";

@QueryHandler(FindByCategoryIdQuery)
export class FindByCategoryIdHandler implements IQueryHandler<FindByCategoryIdQuery> {
  constructor(@InjectRepository(ProductEntity) private repository: Repository<ProductEntity>) {
  }

  async execute(query: FindByCategoryIdQuery): Promise<ProductEntity[]> {
    const {categoryId} = query;
    return await this.repository.findBy({categoryId});
  }
}
