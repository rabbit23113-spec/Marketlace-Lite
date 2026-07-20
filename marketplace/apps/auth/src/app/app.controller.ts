import {Controller} from '@nestjs/common';
import { AppService } from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {SessionEntity} from "./common/entities/session.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern("auth.findOneById")
  async findOneById(@Payload() payload: { sessionId: string }): Promise<SessionEntity> {
    return await this.appService.findOneById(payload.sessionId);
  }
}
