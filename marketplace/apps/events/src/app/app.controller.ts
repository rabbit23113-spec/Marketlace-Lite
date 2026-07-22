import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern} from "@nestjs/microservices";
import {EventEntity} from "./common/entities/event.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("events.findAll")
  async findAll(): Promise<EventEntity[]> {
    return await this.appService.findAll();
  }
}
