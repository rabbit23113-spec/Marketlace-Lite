import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {CreateUserDto} from "./common/dto/createUser.dto";
import {UserEntity} from "./common/entities/user.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("users.create")
  async createUser(@Payload() payload: { dto: CreateUserDto }): Promise<UserEntity> {
    return await this.appService.createUser(payload.dto);
  }
}
