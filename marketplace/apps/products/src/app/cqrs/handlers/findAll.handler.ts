import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindAllQuery} from "../queries/findAll.query";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductEntity} from "../../common/entities/product.entity";
import {Repository} from "typeorm";

@QueryHandler(FindAllQuery)
export class FindAllHandler implements IQueryHandler<FindAllQuery> {
  constructor(@InjectRepository(ProductEntity) private repository: Repository<ProductEntity>) {
  }

  async execute(query: FindAllQuery): Promise<ProductEntity[]> {
    return await this.repository.find();
  }
}
