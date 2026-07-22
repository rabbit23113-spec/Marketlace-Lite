import {Command} from "@nestjs/cqrs";
import {UpdateWarehouseDto} from "../../common/dto/updateWarehouse.dto";
import {WarehouseEntity} from "../../common/entities/warehouse.entity";

export class UpdateWarehouseCommand extends Command<WarehouseEntity> {
  constructor(public readonly warehouseId: string, public readonly dto: UpdateWarehouseDto) {
    super();
  }
}
