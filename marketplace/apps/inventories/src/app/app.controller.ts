import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {InventoryEntity} from "./common/entities/inventory.entity";
import {CreateInventoryDto} from "./common/dto/createInventory.dto";
import {UpdateInventoryDto} from "./common/dto/updateInventory.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("inventories.findByWarehouseId")
  async findByWarehouseId(@Payload() payload: { warehouseId: string }): Promise<InventoryEntity[]> {
    return await this.appService.findByWarehouseId(payload.warehouseId);
  }

  @MessagePattern("inventories.create")
  async create(@Payload() payload: { dto: CreateInventoryDto }): Promise<InventoryEntity> {
    return await this.appService.create(payload.dto);
  }

  @MessagePattern("inventories.update")
  async update(@Payload() payload: { inventoryId: string, dto: UpdateInventoryDto }): Promise<InventoryEntity> {
    const {inventoryId, dto} = payload;
    return await this.appService.update(inventoryId, dto);
  }
}
