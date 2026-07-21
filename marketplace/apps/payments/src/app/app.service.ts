import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CreatePaymentDto} from "./common/dto/createPayment.dto";
import {PaymentEntity} from "./common/entities/payment.entity";
import {CreatePaymentCommand} from "./cqrs/commands/createPayment.command";
import {HandleWebhookCommand} from "./cqrs/commands/handleWebhook.command";

@Injectable()
export class AppService {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  async createPayment(dto: CreatePaymentDto): Promise<PaymentEntity> {
    return await this.commandBus.execute(new CreatePaymentCommand(dto));
  }

  async handleWebhook(body: any): Promise<void> {
    await this.commandBus.execute(new HandleWebhookCommand(body));
  }
}
