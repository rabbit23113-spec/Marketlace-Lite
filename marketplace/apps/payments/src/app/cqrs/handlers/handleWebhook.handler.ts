import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {HandleWebhookCommand} from "../commands/handleWebhook.command";
import {InjectRepository} from "@nestjs/typeorm";
import {PaymentEntity} from "../../common/entities/payment.entity";
import {Repository} from "typeorm";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(HandleWebhookCommand)
export class WebhookHandler implements ICommandHandler<HandleWebhookCommand> {
  constructor(
    @InjectRepository(PaymentEntity) private repository: Repository<PaymentEntity>,
    private pino: PinoLogger,
  ) {
  }

  async execute(command: HandleWebhookCommand): Promise<void> {
    if (command.body.object.status === "succeeded") {
      this.repository.update(command.body.object.id, {status: "succeeded"})
    }
    if (command.body.object.status === "canceled") {
      this.repository.update(command.body.object.id, {status: "canceled"})
    }
  }
}
