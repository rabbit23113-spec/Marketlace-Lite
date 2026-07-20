import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {ProductEntity} from "./common/entities/product.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("products.findAll")
  async findAll(): Promise<ProductEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern("products.findOneById")
  async findOneById(@Payload() payload: { productId: string }): Promise<ProductEntity> {
    return await this.appService.findOneById(payload.productId);
  }

  @MessagePattern("products.findByCategoryId")
  async findByCategoryId(@Payload() payload: { categoryId: string }): Promise<ProductEntity[]> {
    return await this.appService.findByCategoryId(payload.categoryId);
  }

}
