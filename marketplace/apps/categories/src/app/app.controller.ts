import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {CategoryEntity} from "./common/entities/category.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("categories.findAll")
  async findAll(): Promise<CategoryEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern("categories.create")
  async create(@Payload() payload: { name: string }): Promise<CategoryEntity> {
    return await this.appService.create(payload.name);
  }
}
