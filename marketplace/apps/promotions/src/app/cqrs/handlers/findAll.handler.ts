import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindAllQuery} from "../queries/findAll.query";
import {InjectRepository} from "@nestjs/typeorm";
import {PromotionEntity} from "../../common/entities/promotion.entity";
import {Repository} from "typeorm";

@QueryHandler(FindAllQuery)
export class FindAllHandler implements IQueryHandler<FindAllQuery> {
  constructor(@InjectRepository(PromotionEntity) private repository: Repository<PromotionEntity>) {
  }

  async execute(query: FindAllQuery): Promise<PromotionEntity[]> {
    return await this.repository.find();
  }
}
