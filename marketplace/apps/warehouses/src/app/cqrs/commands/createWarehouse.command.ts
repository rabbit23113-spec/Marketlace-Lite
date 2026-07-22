import {WarehouseEntity} from "../../common/entities/warehouse.entity";
import {CreateWarehouseDto} from "../../common/dto/createWarehouse.dto";
import {Command} from "@nestjs/cqrs";

export class CreateWarehouseCommand extends Command<WarehouseEntity> {
  constructor(public readonly dto: CreateWarehouseDto) {
    super();
  }
}
