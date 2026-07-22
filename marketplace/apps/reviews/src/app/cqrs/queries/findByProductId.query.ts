import {ReviewEntity} from "../../common/entities/review.entity";
import {Query} from "@nestjs/cqrs";

export class FindByProductIdQuery extends Query<ReviewEntity[]> {
  constructor(public readonly productId: string) {
    super();
  }
}
