import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {DeliveryEntity} from "./common/entities/delivery.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("delivery.findOneByOrderId")
  async findOneByOrderId(@Payload() payload: { orderId: string }): Promise<DeliveryEntity> {
    return await this.appService.findOneByOrderId(payload.orderId);
  }
}
