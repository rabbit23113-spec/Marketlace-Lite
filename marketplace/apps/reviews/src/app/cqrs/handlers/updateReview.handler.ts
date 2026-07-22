import {UpdateReviewCommand} from "../commands/updateReview.command";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {ReviewEntity} from "../../common/entities/review.entity";
import {Repository} from "typeorm";
import {Inject, NotFoundException} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(UpdateReviewCommand)
export class UpdateReviewHandler implements ICommandHandler<UpdateReviewCommand> {
  constructor(
    @InjectRepository(ReviewEntity) private readonly repository: Repository<ReviewEntity>,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
    private pino: PinoLogger,
  ) {
  }

  async execute(command: UpdateReviewCommand): Promise<ReviewEntity> {
    const {reviewId, dto} = command;
    const review: ReviewEntity | null = await this.repository.findOneBy({reviewId});
    if (!review) throw new NotFoundException("Review not found");
    await this.repository.update(reviewId, dto);

    this.eventsClient.emit("events.create", {domain: "REVIEWS", action: "UPDATED", payload: review});

    return review;
  }
}
