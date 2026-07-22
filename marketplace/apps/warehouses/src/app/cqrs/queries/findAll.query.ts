import {Query} from "@nestjs/cqrs";
import {WarehouseEntity} from "../../common/entities/warehouse.entity";

export class FindAllQuery extends Query<WarehouseEntity[]> {
  constructor() {
    super();
  }
}
