import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {BrandEntity} from "./common/entities/brand.entity";
import {FindAllQuery} from "./cqrs/queries/findAll.query";

@Injectable()
export class AppService {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  async findAll(): Promise<BrandEntity[]> {
    return await this.queryBus.execute(new FindAllQuery());
  }
}
