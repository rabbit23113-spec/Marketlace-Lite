import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteWarehouseCommand} from "../commands/deleteWarehouse.command";
import {InjectRepository} from "@nestjs/typeorm";
import {WarehouseEntity} from "../../common/entities/warehouse.entity";
import {Repository} from "typeorm";
import {Inject, NotFoundException} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(DeleteWarehouseCommand)
export class DeleteWarehouseHandler implements ICommandHandler<DeleteWarehouseCommand> {
  constructor(
    @InjectRepository(WarehouseEntity) private repository: Repository<WarehouseEntity>,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
    private pino: PinoLogger
  ) {
  }

  async execute(command: DeleteWarehouseCommand): Promise<void> {
    const {warehouseId} = command;
    const warehouse: WarehouseEntity | null = await this.repository.findOneBy({warehouseId});
    if (!warehouse) throw new NotFoundException("Warehouse not found");
    await this.repository.delete(warehouseId);

    this.pino.info("WAREHOUSE DELETED", warehouse);
    this.eventsClient.emit("events.create", {domain: "WAREHOUSES", action: "DELETED", payload: warehouse});
  }
}
