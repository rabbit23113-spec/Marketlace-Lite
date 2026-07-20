import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern} from "@nestjs/microservices";
import {ProductEntity} from "./common/entities/product.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("products.findAll")
  async findAll(): Promise<ProductEntity[]> {
    return await this.appService.findAll();
  }

}
