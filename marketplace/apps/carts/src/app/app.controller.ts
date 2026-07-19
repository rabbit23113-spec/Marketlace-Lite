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

  @MessagePattern("carts.findOneByUserId")
  async findOneByUserId(@Payload() payload: { userId: string }): Promise<CartEntity> {
    return await this.appService.findOneByUserId(payload.userId);
  }

  @MessagePattern("carts.create")
  async createOne(@Payload() payload: { userId: string }): Promise<CartEntity> {
    return await this.appService.createCart(payload.userId);
  }

  @MessagePattern("carts.addProduct")
  async addProduct(@Payload() payload: { cartId: string, productId: string }): Promise<CartEntity> {
    return await this.appService.addProduct(payload.cartId, payload.productId);
  }

  @MessagePattern("carts.removeProduct")
  async removeProduct(@Payload() payload: { cartId: string, productId: string }): Promise<CartEntity> {
    return await this.appService.removeProduct(payload.cartId, payload.productId);
  }

  @MessagePattern("carts.reset")
  async resetCart(@Payload() payload: { cartId: string }): Promise<CartEntity> {
    return await this.appService.resetCart(payload.cartId);
  }
}
