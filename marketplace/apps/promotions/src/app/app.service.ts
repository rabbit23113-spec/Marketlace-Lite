import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {PromotionEntity} from "./common/entities/promotion.entity";
import {FindAllQuery} from "./cqrs/queries/findAll.query";
import {CreatePromotionDto} from "./common/dto/createPromotion.dto";
import {CreatePromotionCommand} from "./cqrs/commands/createPromotion.command";
import {UpdatePromotionDto} from "./common/dto/updatePromotion.dto";
import {UpdatePromotionCommand} from "./cqrs/commands/updatePromotion.command";

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

  async update(promotionId: string, dto: UpdatePromotionDto): Promise<PromotionEntity> {
    return await this.commandBus.execute(new UpdatePromotionCommand(promotionId, dto));
  }
}
