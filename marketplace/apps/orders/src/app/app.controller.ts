import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {OrderEntity} from "./common/entities/order.entity";
import {CreateOrderDto} from "./common/dto/createOrder.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("orders.findOneById")
  async findOneById(@Payload() payload: { orderId: string }): Promise<OrderEntity> {
    return await this.appService.findOneById(payload.orderId);
  }

  @MessagePattern("orders.findByUserId")
  async findByUserId(@Payload() payload: { userId: string }): Promise<OrderEntity[]> {
    return await this.appService.findByUserId(payload.userId);
  }

  @MessagePattern("orders.create")
  async create(@Payload() payload: { dto: CreateOrderDto }): Promise<OrderEntity> {
    return await this.appService.create(payload.dto);
  }

  @MessagePattern("orders.updateStatus")
  async updateStatus(@Payload() payload: { orderId: string, status: string }): Promise<OrderEntity> {
    const {orderId, status} = payload;
    return await this.appService.updateStatus(orderId, status);
  }
}
