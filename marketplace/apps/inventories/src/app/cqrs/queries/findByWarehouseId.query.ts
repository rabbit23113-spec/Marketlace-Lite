import {Query} from "@nestjs/cqrs";
import {InventoryEntity} from "../../common/entities/inventory.entity";

export class FindByWarehouseIdQuery extends Query<InventoryEntity[]> {
  constructor(public readonly warehouseId: string) {
    super();
  }
}
