import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindByWarehouseIdQuery} from "../queries/findByWarehouseId.query";
import {Repository} from "typeorm";
import {InventoryEntity} from "../../common/entities/inventory.entity";
import {InjectRepository} from "@nestjs/typeorm";

@QueryHandler(FindByWarehouseIdQuery)
export class FindByWarehouseIdHandler implements IQueryHandler<FindByWarehouseIdQuery> {
  constructor(@InjectRepository(InventoryEntity) private readonly repository: Repository<InventoryEntity>) {
  }

  async execute(query: FindByWarehouseIdQuery): Promise<InventoryEntity[]> {
    const {warehouseId} = query;
    return await this.repository.findBy({warehouseId});
  }
}
