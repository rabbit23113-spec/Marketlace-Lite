import {CreateOrderCommand} from "../commands/createOrder.command";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {OrderEntity} from "../../common/entities/order.entity";
import {Repository} from "typeorm";
import {ClientProxy} from "@nestjs/microservices";
import {Inject} from "@nestjs/common";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    @InjectRepository(OrderEntity) private readonly repository: Repository<OrderEntity>,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
    private pino: PinoLogger
  ) {
  }

  async execute(command: CreateOrderCommand): Promise<OrderEntity> {
    const {dto} = command;
    const order: OrderEntity = this.repository.create(dto);
    await this.repository.save(order);

    this.pino.info("ORDER CREATED", order);
    this.eventsClient.emit("events.create", {domain: "ORDERS", action: "CREATED", payload: order});

    return order;
  }
}
