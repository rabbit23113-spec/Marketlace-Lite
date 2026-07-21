import {Command} from "@nestjs/cqrs";
import {PromotionEntity} from "../../common/entities/promotion.entity";
import {UpdatePromotionDto} from "../../common/dto/updatePromotion.dto";

export class UpdatePromotionCommand extends Command<PromotionEntity> {
  constructor(public readonly promotionId: string, public readonly dto: UpdatePromotionDto) {
    super();
  }
}
