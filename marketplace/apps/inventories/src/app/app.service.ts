import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {InventoryEntity} from "./common/entities/inventory.entity";
import {FindByWarehouseIdQuery} from "./cqrs/queries/findByWarehouseId.query";

@Injectable()
export class AppService {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  async findByWarehouseId(warehouseId: string): Promise<InventoryEntity[]> {
    return await this.queryBus.execute(new FindByWarehouseIdQuery(warehouseId));
  }
}
