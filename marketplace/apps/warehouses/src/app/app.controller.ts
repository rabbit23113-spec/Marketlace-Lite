import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {WarehouseEntity} from "./common/entities/warehouse.entity";
import {CreateWarehouseDto} from "./common/dto/createWarehouse.dto";
import {UpdateWarehouseDto} from "./common/dto/updateWarehouse.dto";

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

  @MessagePattern("warehouses.create")
  async create(@Payload() payload: { dto: CreateWarehouseDto }): Promise<WarehouseEntity> {
    return await this.appService.create(payload.dto);
  }

  @MessagePattern("warehouses.update")
  async update(@Payload() payload: { warehouseId: string, dto: UpdateWarehouseDto }): Promise<WarehouseEntity> {
    const {warehouseId, dto} = payload;
    return await this.appService.update(warehouseId, dto);
  }

  @EventPattern("warehouses.delete")
  async delete(@Payload() payload: { warehouseId: string }): Promise<void> {
    await this.appService.deleteOne(payload.warehouseId);
  }
}
