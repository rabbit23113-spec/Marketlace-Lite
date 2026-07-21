import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {CreatePaymentDto} from "./common/dto/createPayment.dto";
import {PaymentEntity} from "./common/entities/payment.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("payments.create")
  async createPayment(@Payload() payload: { dto: CreatePaymentDto }): Promise<PaymentEntity> {
    return await this.appService.createPayment(payload.dto);
  }
}
