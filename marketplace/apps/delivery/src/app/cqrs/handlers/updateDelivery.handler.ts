import {UpdateDeliveryCommand} from "../commands/updateDelivery.command";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {DeliveryEntity} from "../../common/entities/delivery.entity";
import {Repository} from "typeorm";
import {Inject, NotFoundException} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(UpdateDeliveryCommand)
export class UpdateDeliveryHandler implements ICommandHandler<UpdateDeliveryCommand> {
  constructor(
    @InjectRepository(DeliveryEntity) private readonly repository: Repository<DeliveryEntity>,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
    private pino: PinoLogger,
  ) {
  }

  async execute(command: UpdateDeliveryCommand): Promise<DeliveryEntity> {
    const {deliveryId, dto} = command;
    const delivery: DeliveryEntity | null = await this.repository.findOneBy({deliveryId});
    if (!delivery) throw new NotFoundException("Delivery not found");
    await this.repository.update(deliveryId, dto);

    this.pino.info("DELIVERY UPDATED", delivery);
    this.eventsClient.emit("events.create", {domain: "DELIVERY", action: "UPDATED", payload: delivery});

    return delivery;
  }
}
