import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindByBrandIdQuery} from "../queries/findByBrandId.query";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductEntity} from "../../common/entities/product.entity";
import {Repository} from "typeorm";

@QueryHandler(FindByBrandIdQuery)
export class FindByBrandIdHandler implements IQueryHandler<FindByBrandIdQuery> {
  constructor(@InjectRepository(ProductEntity) private repository: Repository<ProductEntity>) {
  }

  async execute(query: FindByBrandIdQuery): Promise<ProductEntity[]> {
    const {brandId} = query;
    return await this.repository.findBy({brandId});
  }
}
