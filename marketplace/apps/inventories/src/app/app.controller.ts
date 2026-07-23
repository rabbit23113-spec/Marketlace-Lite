import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {InventoryEntity} from "./common/entities/inventory.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("inventories.findByWarehouseId")
  async findByWarehouseId(@Payload() payload: { warehouseId: string }): Promise<InventoryEntity[]> {
    return await this.appService.findByWarehouseId(payload.warehouseId);
  }
}
