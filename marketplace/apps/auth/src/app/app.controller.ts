import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {SessionEntity} from "./common/entities/session.entity";
import {SignInDto} from "./common/dto/signIn.dto";
import {AuthResponseDto} from "./common/dto/authResponse.dto";
import {SignUpDto} from "./common/dto/signUp.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("auth.findByUserId")
  async findByUserId(@Payload() payload: { userId: string }): Promise<SessionEntity[]> {
    return await this.appService.findByUserId(payload.userId);
  }

  @MessagePattern("auth.findOneById")
  async findOneById(@Payload() payload: { sessionId: string }): Promise<SessionEntity> {
    return await this.appService.findOneById(payload.sessionId);
  }

  @MessagePattern("auth.signIn")
  async signIn(@Payload() payload: { dto: SignInDto }): Promise<AuthResponseDto> {
    return await this.appService.signIn(payload.dto);
  }

  @MessagePattern("auth.signUp")
  async signUp(@Payload() payload: { dto: SignUpDto }): Promise<AuthResponseDto> {
    return await this.appService.signUp(payload.dto);
  }
}
