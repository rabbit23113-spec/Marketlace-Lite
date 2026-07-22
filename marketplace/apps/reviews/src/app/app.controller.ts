import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern} from "@nestjs/microservices";
import {ReviewEntity} from "./common/entities/review.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("reviews.findAll")
  async findAll(): Promise<ReviewEntity[]> {
    return await this.appService.findAll();
  }

}
