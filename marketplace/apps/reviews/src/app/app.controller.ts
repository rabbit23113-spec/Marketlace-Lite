import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {ReviewEntity} from "./common/entities/review.entity";
import {CreateReviewDto} from "./common/dto/createReview.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("reviews.findAll")
  async findAll(): Promise<ReviewEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern("reviews.findByProductId")
  async findByProductId(@Payload() payload: { productId: string }): Promise<ReviewEntity[]> {
    return await this.appService.findByProductId(payload.productId);
  }

  @MessagePattern("reviews.create")
  async create(@Payload() payload: { dto: CreateReviewDto }): Promise<ReviewEntity> {
    return await this.appService.create(payload.dto);
  }

}
