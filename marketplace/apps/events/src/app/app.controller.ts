import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {EventEntity} from "./common/entities/event.entity";
import {CreateEventDto} from "./common/dto/createEvent.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("events.findAll")
  async findAll(): Promise<EventEntity[]> {
    return await this.appService.findAll();
  }

  @EventPattern("events.create")
  async create(@Payload() payload: { dto: CreateEventDto }): Promise<void> {
    await this.appService.create(payload.dto);
  }
}
