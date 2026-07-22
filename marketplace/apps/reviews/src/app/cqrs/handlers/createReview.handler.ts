import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateReviewCommand} from "../commands/createReview.command";
import {InjectRepository} from "@nestjs/typeorm";
import {ReviewEntity} from "../../common/entities/review.entity";
import {Repository} from "typeorm";
import {Inject} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(CreateReviewCommand)
export class CreateReviewHandler implements ICommandHandler<CreateReviewCommand> {
  constructor(
    @InjectRepository(ReviewEntity) private readonly repository: Repository<ReviewEntity>,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
    private pino: PinoLogger,
  ) {
  }

  async execute(command: CreateReviewCommand): Promise<ReviewEntity> {
    const {dto} = command;
    const review: ReviewEntity = this.repository.create(dto);
    await this.repository.save(review);

    this.eventsClient.emit("events.create", {domain: "REVIEWS", action: "CREATED", payload: review});
    this.pino.info("REVIEW CREATED", review);

    return review;
  }
}
