import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern} from "@nestjs/microservices";
import {BrandEntity} from "./common/entities/brand.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("brands.findAll")
  async findAll(): Promise<BrandEntity[]> {
    return await this.appService.findAll();
  }

}
