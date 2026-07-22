import {Command} from "@nestjs/cqrs";

export class DeleteReviewCommand extends Command<void> {
  constructor(public readonly reviewId: string) {
    super();
  }
}
