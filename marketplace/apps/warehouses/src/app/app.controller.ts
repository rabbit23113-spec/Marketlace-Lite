import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {WarehouseEntity} from "./common/entities/warehouse.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("warehouses.findAll")
  async findAll(): Promise<WarehouseEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern("warehouses.findOneById")
  async findOneById(@Payload() payload: { warehouseId: string }): Promise<WarehouseEntity> {
    return await this.appService.findOneById(payload.warehouseId);
  }
}
