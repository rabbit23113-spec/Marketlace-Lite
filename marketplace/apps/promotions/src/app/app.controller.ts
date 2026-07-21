import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern} from "@nestjs/microservices";
import {PromotionEntity} from "./common/entities/promotion.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("promotions.findAll")
  async findAll(): Promise<PromotionEntity[]> {
    return await this.appService.findAll();
  }

}
