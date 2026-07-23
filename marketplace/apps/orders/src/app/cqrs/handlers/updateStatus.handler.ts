import {UpdateStatusCommand} from "../commands/updateStatus.command";
import {InjectRepository} from "@nestjs/typeorm";
import {OrderEntity} from "../../common/entities/order.entity";
import {Repository} from "typeorm";
import {Inject, NotFoundException} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {PinoLogger} from "nestjs-pino";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";

@CommandHandler(UpdateStatusCommand)
export class UpdateStatusHandler implements ICommandHandler<UpdateStatusCommand> {
  constructor(
    @InjectRepository(OrderEntity) private readonly repository: Repository<OrderEntity>,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
    private pino: PinoLogger
  ) {
  }

  async execute(command: UpdateStatusCommand): Promise<OrderEntity> {
    const {orderId, status} = command;
    const order: OrderEntity | null = await this.repository.findOneBy({orderId});
    if (!order) throw new NotFoundException("Order not found");
    await this.repository.update(orderId, {status});

    this.pino.logger("STATUS UPDATED", order);
    this.eventsClient.emit("events.create", {domain: "ORDERS", action: "STATUS UPDATED", payload: order});

    return order;
  }
}
