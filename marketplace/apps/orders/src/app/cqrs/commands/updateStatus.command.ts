import {OrderEntity} from "../../common/entities/order.entity";
import {Command} from "@nestjs/cqrs";

export class UpdateStatusCommand extends Command<OrderEntity> {
  constructor(public readonly orderId: string, public readonly status: string) {
    super();
  }
}
