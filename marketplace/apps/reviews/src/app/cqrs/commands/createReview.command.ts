import {CreateReviewDto} from "../../common/dto/createReview.dto";
import {Command} from "@nestjs/cqrs";
import {ReviewEntity} from "../../common/entities/review.entity";

export class CreateReviewCommand extends Command<ReviewEntity> {
  constructor(public readonly dto: CreateReviewDto) {
    super();
  }
}
