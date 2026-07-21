import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {NotificationEntity} from "./common/entities/notification.entity";
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {CreateVerificationDto} from "./common/dto/createVerification.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("notifications.findAll")
  async findAll(): Promise<NotificationEntity[]> {
    return await this.appService.findAll();
  }

  @EventPattern("notifications.verification")
  async sendVerification(@Payload() payload: { dto: CreateVerificationDto }): Promise<void> {
    await this.appService.sendVerification(payload.dto);
  }
}
