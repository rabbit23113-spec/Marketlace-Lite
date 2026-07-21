import {Query} from "@nestjs/cqrs";
import {PromotionEntity} from "../../common/entities/promotion.entity";

export class FindAllQuery extends Query<PromotionEntity[]> {
  constructor() {
    super();
  }
}
