import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {NotificationEntity} from "./common/entities/notification.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  async findAll(): Promise<NotificationEntity[]> {
    return await this.appService.findAll();
  }
}
