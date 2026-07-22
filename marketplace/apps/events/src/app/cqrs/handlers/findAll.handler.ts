import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindAllQuery} from "../queries/findAll.query";
import {InjectRepository} from "@nestjs/typeorm";
import {EventEntity} from "../../common/entities/event.entity";
import {Repository} from "typeorm";

@QueryHandler(FindAllQuery)
export class FindAllHandler implements IQueryHandler<FindAllQuery> {
  constructor(@InjectRepository(EventEntity) private readonly repository: Repository<EventEntity>) {
  }

  async execute(query: FindAllQuery): Promise<EventEntity[]> {
    return await this.repository.find();
  }
}
