import {OrderEntity} from "../../common/entities/order.entity";
import {CreateOrderDto} from "../../common/dto/createOrder.dto";
import {Command} from "@nestjs/cqrs";

export class CreateOrderCommand extends Command<OrderEntity> {
  constructor(public readonly dto: CreateOrderDto) {
    super();
  }
}
