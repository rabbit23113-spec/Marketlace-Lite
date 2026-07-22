import {Query} from "@nestjs/cqrs";
import {WarehouseEntity} from "../../common/entities/warehouse.entity";

export class FindOneByIdQuery extends Query<WarehouseEntity> {
  constructor(public readonly warehouseId: string) {
    super();
  }
}
