import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateDeliveryCommand} from "../commands/createDelivery.command";
import {InjectRepository} from "@nestjs/typeorm";
import {DeliveryEntity} from "../../common/entities/delivery.entity";
import {Repository} from "typeorm";
import {Inject} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(CreateDeliveryCommand)
export class CreateDeliveryHandler implements ICommandHandler<CreateDeliveryCommand> {
  constructor(
    @InjectRepository(DeliveryEntity) private readonly repository: Repository<DeliveryEntity>,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
    private pino: PinoLogger,
  ) {
  }

  async execute(command: CreateDeliveryCommand): Promise<DeliveryEntity> {
    const {dto} = command;
    const delivery: DeliveryEntity = this.repository.create(dto);
    await this.repository.save(delivery);

    this.pino.info("DELIVERY CREATED", delivery);
    this.eventsClient.emit("events.create", {domain: "DELIVERY", action: "CREATED", payload: delivery});

    return delivery;
  }
}
