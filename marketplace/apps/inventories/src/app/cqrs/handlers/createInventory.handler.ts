import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateInventoryCommand} from "../commands/createInventory.command";
import {InjectRepository} from "@nestjs/typeorm";
import {InventoryEntity} from "../../common/entities/inventory.entity";
import {Repository} from "typeorm";
import {PinoLogger} from "nestjs-pino";
import {ClientProxy} from "@nestjs/microservices";
import {Inject} from "@nestjs/common";

@CommandHandler(CreateInventoryCommand)
export class CreateInventoryHandler implements ICommandHandler<CreateInventoryCommand> {
  constructor(
    @InjectRepository(InventoryEntity) private readonly repository: Repository<InventoryEntity>,
    private pino: PinoLogger,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
  ) {
  }

  async execute(command: CreateInventoryCommand): Promise<InventoryEntity> {
    const {dto} = command;
    const inventory: InventoryEntity = this.repository.create(dto);
    await this.repository.save(inventory);

    this.pino.info("INVENTORY CREATED", inventory);
    this.eventsClient.emit("events.create", {domain: "INVENTORIES", action: "CREATED", payload: inventory});

    return inventory;
  }
}
