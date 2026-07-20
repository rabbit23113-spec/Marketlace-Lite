import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindAllQuery} from "../queries/findAll.query";
import {InjectRepository} from "@nestjs/typeorm";
import {CategoryEntity} from "../../common/entities/category.entity";
import {Repository} from "typeorm";

@QueryHandler(FindAllQuery)
export class FindAllHandler implements IQueryHandler<FindAllQuery> {
  constructor(@InjectRepository(CategoryEntity) private repository: Repository<CategoryEntity>) {
  }

  async execute(query: FindAllQuery): Promise<CategoryEntity[]> {
    return await this.repository.find();
  }
}
