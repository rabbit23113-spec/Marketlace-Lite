import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {WarehouseEntity} from "./common/entities/warehouse.entity";
import {FindAllQuery} from "./cqrs/queries/findAll.query";
import {FindOneByIdQuery} from "./cqrs/queries/findOneById.query";

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
}
