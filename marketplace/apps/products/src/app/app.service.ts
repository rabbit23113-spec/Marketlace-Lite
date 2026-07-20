import { Injectable } from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ProductEntity} from "./common/entities/product.entity";
import {FindAllQuery} from "./cqrs/queries/findAll.query";

@Injectable()
export class AppService {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.queryBus.execute(new FindAllQuery());
  }
}
