import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindAllQuery} from "../queries/findAll.query";
import {WarehouseEntity} from "../../common/entities/warehouse.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@QueryHandler(FindAllQuery)
export class FindAllHandler implements IQueryHandler<FindAllQuery> {
  constructor(@InjectRepository(WarehouseEntity) private readonly repository: Repository<WarehouseEntity>) {
  }

  async execute(query: FindAllQuery): Promise<WarehouseEntity[]> {
    return await this.repository.find();
  }
}
