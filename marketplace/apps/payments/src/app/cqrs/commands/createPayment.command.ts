import {Command} from "@nestjs/cqrs";
import {PaymentEntity} from "../../common/entities/payment.entity";
import {CreatePaymentDto} from "../../common/dto/createPayment.dto";

export class CreatePaymentCommand extends Command<PaymentEntity> {
  constructor(public readonly dto: CreatePaymentDto) {
    super();
  }
}
