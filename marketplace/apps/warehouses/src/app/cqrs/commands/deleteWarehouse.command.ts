import {Command} from "@nestjs/cqrs";

export class DeleteWarehouseCommand extends Command<void> {
  constructor(public readonly warehouseId: string) {
    super();
  }
}
