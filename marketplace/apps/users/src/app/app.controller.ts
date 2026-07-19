import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {CreateUserDto} from "./common/dto/createUser.dto";
import {UserEntity} from "./common/entities/user.entity";
import {UpdateUserDto} from "./common/dto/updateUser.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("users.create")
  async createUser(@Payload() payload: { dto: CreateUserDto }): Promise<UserEntity> {
    return await this.appService.createUser(payload.dto);
  }

  @MessagePattern("users.updateOne")
  async updateUser(@Payload() payload: { userId: string, dto: UpdateUserDto }): Promise<UserEntity> {
    return await this.appService.updateUser(payload.userId, payload.dto);
  }

  @EventPattern("users.deleteOne")
  async deleteUser(@Payload() payload: { userId: string }): Promise<void> {
    await this.appService.deleteUser(payload.userId);
  }

  @MessagePattern("users.findOneById")
  async findOneById(@Payload() payload: { userId: string }): Promise<UserEntity> {
    return await this.appService.findOneById(payload.userId);
  }
}
