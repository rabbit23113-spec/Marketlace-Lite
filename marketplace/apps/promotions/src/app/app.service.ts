import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {PromotionEntity} from "./common/entities/promotion.entity";
import {FindAllQuery} from "./cqrs/queries/findAll.query";
import {CreatePromotionDto} from "./common/dto/createPromotion.dto";
import {CreatePromotionCommand} from "./cqrs/commands/createPromotion.command";

@Injectable()
export class AppService {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  async findAll(): Promise<PromotionEntity[]> {
    return await this.queryBus.execute(new FindAllQuery());
  }

  async create(dto: CreatePromotionDto): Promise<PromotionEntity> {
    return await this.commandBus.execute(new CreatePromotionCommand(dto));
  }
}
