import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ReviewEntity} from "./common/entities/review.entity";
import {FindAllQuery} from "./cqrs/queries/findAll.query";
import {FindByProductIdQuery} from "./cqrs/queries/findByProductId.query";
import {CreateReviewDto} from "./common/dto/createReview.dto";
import {CreateReviewCommand} from "./cqrs/commands/createReview.command";

@Injectable()
export class AppService {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {
  }

  async findAll(): Promise<ReviewEntity[]> {
    return await this.queryBus.execute(new FindAllQuery());
  }

  async findByProductId(productId: string): Promise<ReviewEntity[]> {
    return await this.queryBus.execute(new FindByProductIdQuery(productId));
  }

  async create(dto: CreateReviewDto): Promise<ReviewEntity> {
    return await this.commandBus.execute(new CreateReviewCommand(dto));
  }
}
