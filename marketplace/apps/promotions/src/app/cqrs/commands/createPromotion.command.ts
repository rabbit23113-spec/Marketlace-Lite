import {Command} from "@nestjs/cqrs";
import {PromotionEntity} from "../../common/entities/promotion.entity";
import {CreatePromotionDto} from "../../common/dto/createPromotion.dto";

export class CreatePromotionCommand extends Command<PromotionEntity> {
  constructor(public readonly dto: CreatePromotionDto) {
    super();
  }
}
