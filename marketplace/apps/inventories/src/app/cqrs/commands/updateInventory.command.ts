import {InventoryEntity} from "../../common/entities/inventory.entity";
import {Command} from "@nestjs/cqrs";
import {UpdateInventoryDto} from "../../common/dto/updateInventory.dto";

export class UpdateInventoryCommand extends Command<InventoryEntity> {
  constructor(public readonly inventoryId: string, public readonly dto: UpdateInventoryDto) {
    super();
  }
}
