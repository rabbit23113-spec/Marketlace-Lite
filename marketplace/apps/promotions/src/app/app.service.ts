import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {PromotionEntity} from "./common/entities/promotion.entity";
import {FindAllQuery} from "./cqrs/queries/findAll.query";

@Injectable()
export class AppService {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  async findAll(): Promise<PromotionEntity[]> {
    return await this.queryBus.execute(new FindAllQuery());
  }
}
