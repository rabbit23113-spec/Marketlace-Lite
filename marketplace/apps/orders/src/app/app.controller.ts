import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {OrderEntity} from "./common/entities/order.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("orders.findByUserId")
  async findByUserId(@Payload() payload: { userId: string }): Promise<OrderEntity[]> {
    return await this.appService.findByUserId(payload.userId);
  }
}
