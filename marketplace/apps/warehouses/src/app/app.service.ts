import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {WarehouseEntity} from "./common/entities/warehouse.entity";
import {FindAllQuery} from "./cqrs/queries/findAll.query";
import {FindOneByIdQuery} from "./cqrs/queries/findOneById.query";
import {CreateWarehouseDto} from "./common/dto/createWarehouse.dto";
import {CreateWarehouseCommand} from "./cqrs/commands/createWarehouse.command";
import {UpdateWarehouseDto} from "./common/dto/updateWarehouse.dto";
import {UpdateWarehouseCommand} from "./cqrs/commands/updateWarehouse.command";

@Injectable()
export class AppService {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {
  }

  async findAll(): Promise<WarehouseEntity[]> {
    return await this.queryBus.execute(new FindAllQuery());
  }

  async findOneById(warehouseId: string): Promise<WarehouseEntity> {
    return await this.queryBus.execute(new FindOneByIdQuery(warehouseId));
  }

  async create(dto: CreateWarehouseDto): Promise<WarehouseEntity> {
    return await this.commandBus.execute(new CreateWarehouseCommand(dto));
  }

  async update(warehouseId: string, dto: UpdateWarehouseDto): Promise<WarehouseEntity> {
    return await this.commandBus.execute(new UpdateWarehouseCommand(warehouseId, dto));
  }
}
