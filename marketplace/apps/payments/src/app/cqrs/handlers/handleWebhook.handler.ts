import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {HandleWebhookCommand} from "../commands/handleWebhook.command";
import {InjectRepository} from "@nestjs/typeorm";
import {PaymentEntity} from "../../common/entities/payment.entity";
import {Repository} from "typeorm";
import {PinoLogger} from "nestjs-pino";
import {Inject} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";

@CommandHandler(HandleWebhookCommand)
export class WebhookHandler implements ICommandHandler<HandleWebhookCommand> {
  constructor(
    @InjectRepository(PaymentEntity) private repository: Repository<PaymentEntity>,
    private pino: PinoLogger,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
  ) {
  }

  async execute(command: HandleWebhookCommand): Promise<void> {
    if (command.body.object.status === "succeeded") {
      await this.repository.update(command.body.object.id, {status: "succeeded"})
      this.pino.info("PAYMENT SUCCEEDED", command.body.object)
      this.eventsClient.emit("events.create", {domain: "PAYMENTS", action: "SUCCEEDED", payload: command.body.object});
    }
    if (command.body.object.status === "canceled") {
      await this.repository.update(command.body.object.id, {status: "canceled"})
      this.pino.info("PAYMENT CANCELED", command.body.object)
      this.eventsClient.emit("events.create", {domain: "PAYMENTS", action: "CANCELED", payload: command.body.object});
    }
  }
}
