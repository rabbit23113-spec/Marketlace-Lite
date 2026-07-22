import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindAllQuery} from "../queries/findAll.query";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {ReviewEntity} from "../../common/entities/review.entity";

@QueryHandler(FindAllQuery)
export class FindAllHandler implements IQueryHandler<FindAllQuery> {
  constructor(@InjectRepository(ReviewEntity) private readonly repository: Repository<ReviewEntity>) {
  }

  async execute(query: FindAllQuery): Promise<ReviewEntity[]> {
    return await this.repository.find();
  }
}
