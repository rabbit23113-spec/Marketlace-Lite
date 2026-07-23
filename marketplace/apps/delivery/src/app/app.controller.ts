import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {DeliveryEntity} from "./common/entities/delivery.entity";
import {CreateDeliveryDto} from "./common/dto/createDelivery.dto";
import {UpdateDeliveryDto} from "./common/dto/updateDelivery.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("delivery.findOneById")
  async findOneById(@Payload() payload: { deliveryId: string }): Promise<DeliveryEntity> {
    return await this.appService.findOneById(payload.deliveryId);
  }

  @MessagePattern("delivery.findOneByOrderId")
  async findOneByOrderId(@Payload() payload: { orderId: string }): Promise<DeliveryEntity> {
    return await this.appService.findOneByOrderId(payload.orderId);
  }

  @MessagePattern("delivery.create")
  async create(@Payload() payload: { dto: CreateDeliveryDto }): Promise<DeliveryEntity> {
    return await this.appService.create(payload.dto);
  }

  @MessagePattern("delivery.update")
  async update(@Payload() payload: { deliveryId: string, dto: UpdateDeliveryDto }): Promise<DeliveryEntity> {
    const {deliveryId, dto} = payload;
    return await this.appService.update(deliveryId, dto);
  }
}
