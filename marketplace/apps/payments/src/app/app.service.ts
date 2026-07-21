import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CreatePaymentDto} from "./common/dto/createPayment.dto";
import {PaymentEntity} from "./common/entities/payment.entity";
import {CreatePaymentCommand} from "./cqrs/commands/createPayment.command";

@Injectable()
export class AppService {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  async createPayment(dto: CreatePaymentDto): Promise<PaymentEntity> {
    return await this.commandBus.execute(new CreatePaymentCommand(dto));
  }
}
