import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {PromotionEntity} from "./common/entities/promotion.entity";
import {CreatePromotionDto} from "./common/dto/createPromotion.dto";
import {UpdatePromotionDto} from "./common/dto/updatePromotion.dto";

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

  @MessagePattern("promotions.update")
  async update(@Payload() payload: { promotionId: string, dto: UpdatePromotionDto }): Promise<PromotionEntity> {
    const {promotionId, dto} = payload;
    return await this.appService.update(promotionId, dto);
  }

  @EventPattern("promotions.delete")
  async deleteOne(@Payload() payload: { promotionId: string }): Promise<void> {
    await this.appService.deleteOne(payload.promotionId);
  }

}
