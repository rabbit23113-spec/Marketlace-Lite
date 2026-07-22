import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateWarehouseCommand} from "../commands/updateWarehouse.command";
import {InjectRepository} from "@nestjs/typeorm";
import {WarehouseEntity} from "../../common/entities/warehouse.entity";
import {Repository} from "typeorm";
import {Inject, UnauthorizedException} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(UpdateWarehouseCommand)
export class UpdateWarehouseHandler implements ICommandHandler<UpdateWarehouseCommand> {
  constructor(
    @InjectRepository(WarehouseEntity) private repository: Repository<WarehouseEntity>,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
    private pino: PinoLogger
  ) {
  }

  async execute(command: UpdateWarehouseCommand): Promise<WarehouseEntity> {
    const {warehouseId, dto} = command;
    const warehouse: WarehouseEntity | null = await this.repository.findOneBy({warehouseId});
    if (!warehouse) throw new UnauthorizedException("Warehouse not found");
    await this.repository.update(warehouseId, dto);

    this.pino.info("WAREHOUSE UPDATED", warehouse);
    this.eventsClient.emit("events.create", {domain: "WAREHOUSES", action: "UPDATED", payload: warehouse});

    return warehouse;
  }
}
