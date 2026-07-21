import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {NotificationEntity} from "./common/entities/notification.entity";
import {MessagePattern} from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("notifications.findAll")
  async findAll(): Promise<NotificationEntity[]> {
    return await this.appService.findAll();
  }
}
