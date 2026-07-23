import {InventoryEntity} from "../../common/entities/inventory.entity";
import {Command} from "@nestjs/cqrs";
import {CreateInventoryDto} from "../../common/dto/createInventory.dto";

export class CreateInventoryCommand extends Command<InventoryEntity> {
  constructor(public readonly dto: CreateInventoryDto) {
    super();
  }
}
