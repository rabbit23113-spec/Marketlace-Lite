import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {PromotionEntity} from "./common/entities/promotion.entity";
import {CreatePromotionDto} from "./common/dto/createPromotion.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("promotions.findAll")
  async findAll(): Promise<PromotionEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern("promotions.create")
  async create(@Payload() payload: { dto: CreatePromotionDto }): Promise<PromotionEntity> {
    return await this.appService.create(payload.dto);
  }

}
