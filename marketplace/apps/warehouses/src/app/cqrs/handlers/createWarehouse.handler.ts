import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateWarehouseCommand} from "../commands/createWarehouse.command";
import {InjectRepository} from "@nestjs/typeorm";
import {WarehouseEntity} from "../../common/entities/warehouse.entity";
import {Repository} from "typeorm";
import {Inject} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(CreateWarehouseCommand)
export class CreateWarehouseHandler implements ICommandHandler<CreateWarehouseCommand> {
  constructor(
    @InjectRepository(WarehouseEntity) private repository: Repository<WarehouseEntity>,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
    private pino: PinoLogger
  ) {
  }

  async execute(command: CreateWarehouseCommand): Promise<WarehouseEntity> {
    const {dto} = command;
    const warehouse: WarehouseEntity = this.repository.create(dto);
    await this.repository.save(warehouse);

    this.pino.info("WAREHOUSE CREATED", warehouse);
    this.eventsClient.emit("events.create", {domain: "WAREHOUSES", action: "CREATED", payload: warehouse});

    return warehouse;
  }
}
