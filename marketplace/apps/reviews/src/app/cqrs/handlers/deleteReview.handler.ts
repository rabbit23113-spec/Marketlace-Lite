import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteReviewCommand} from "../commands/deleteReview.command";
import {InjectRepository} from "@nestjs/typeorm";
import {ReviewEntity} from "../../common/entities/review.entity";
import {Repository} from "typeorm";
import {Inject, NotFoundException} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(DeleteReviewCommand)
export class DeleteReviewHandler implements ICommandHandler<DeleteReviewCommand> {
  constructor(
    @InjectRepository(ReviewEntity) private readonly repository: Repository<ReviewEntity>,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
    private pino: PinoLogger,
  ) {
  }

  async execute(command: DeleteReviewCommand): Promise<void> {
    const {reviewId} = command;
    const review: ReviewEntity | null = await this.repository.findOneBy({reviewId});
    if (!review) throw new NotFoundException(`Review not found`);
    await this.repository.delete(reviewId);

    this.pino.info("REVIEW DELETED", review);
    this.eventsClient.emit("events.create", {domain: "REVIEWS", action: "DELETED", payload: review});
  }
}
