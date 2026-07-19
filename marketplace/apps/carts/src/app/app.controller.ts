import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {CartEntity} from "./common/entities/cart.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("carts.findOneById")
  async findOneById(@Payload() payload: { cartId: string }): Promise<CartEntity> {
    return await this.appService.findOneById(payload.cartId);
  }
}
