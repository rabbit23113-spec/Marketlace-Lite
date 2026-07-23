import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateInventoryCommand} from "../commands/updateInventory.command";
import {InjectRepository} from "@nestjs/typeorm";
import {InventoryEntity} from "../../common/entities/inventory.entity";
import {Repository} from "typeorm";
import {PinoLogger} from "nestjs-pino";
import {Inject, NotFoundException} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";

@CommandHandler(UpdateInventoryCommand)
export class UpdateInventoryHandler implements ICommandHandler<UpdateInventoryCommand> {
  constructor(
    @InjectRepository(InventoryEntity) private readonly repository: Repository<InventoryEntity>,
    private pino: PinoLogger,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
  ) {
  }

  async execute(command: UpdateInventoryCommand): Promise<InventoryEntity> {
    const {inventoryId, dto} = command;
    const inventory: InventoryEntity | null = await this.repository.findOneBy({inventoryId});
    if (!inventory) throw new NotFoundException("Inventory not found");
    await this.repository.update(inventoryId, dto);

    this.pino.info("INVENTORY UPDATED", inventory);
    this.eventsClient.emit("events.create", {domain: "INVENTORIES", action: "UPDATED", payload: inventory});

    return inventory;
  }
}
