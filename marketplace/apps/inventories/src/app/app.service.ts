import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {InventoryEntity} from "./common/entities/inventory.entity";
import {FindByWarehouseIdQuery} from "./cqrs/queries/findByWarehouseId.query";
import {CreateInventoryDto} from "./common/dto/createInventory.dto";
import {CreateInventoryCommand} from "./cqrs/commands/createInventory.command";
import {UpdateInventoryDto} from "./common/dto/updateInventory.dto";
import {UpdateInventoryCommand} from "./cqrs/commands/updateInventory.command";

@Injectable()
export class AppService {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  async findByWarehouseId(warehouseId: string): Promise<InventoryEntity[]> {
    return await this.queryBus.execute(new FindByWarehouseIdQuery(warehouseId));
  }

  async create(dto: CreateInventoryDto): Promise<InventoryEntity> {
    return await this.commandBus.execute(new CreateInventoryCommand(dto));
  }

  async update(inventoryId: string, dto: UpdateInventoryDto): Promise<InventoryEntity> {
    return await this.commandBus.execute(new UpdateInventoryCommand(inventoryId, dto));
  }
}
