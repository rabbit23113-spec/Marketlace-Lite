import {ICommandHandler, QueryHandler} from "@nestjs/cqrs";
import {FindOneByIdQuery} from "../queries/findOneById.query";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {WarehouseEntity} from "../../common/entities/warehouse.entity";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(FindOneByIdQuery)
export class FindOneByIdHandler implements ICommandHandler<FindOneByIdQuery> {
  constructor(
    @InjectRepository(WarehouseEntity) private readonly repository: Repository<WarehouseEntity>,
  ) {
  }

  async execute(query: FindOneByIdQuery): Promise<WarehouseEntity> {
    const {warehouseId} = query;
    const warehouse: WarehouseEntity | null = await this.repository.findOneBy({warehouseId});
    if (!warehouse) throw new NotFoundException("Warehouse not found");
    return warehouse;
  }
}
