import {Command} from "@nestjs/cqrs";
import {ReviewEntity} from "../../common/entities/review.entity";
import {UpdateReviewDto} from "../../common/dto/updateReview.dto";

export class UpdateReviewCommand extends Command<ReviewEntity> {
  constructor(public readonly reviewId: string, public readonly dto: UpdateReviewDto) {
    super();
  }
}
