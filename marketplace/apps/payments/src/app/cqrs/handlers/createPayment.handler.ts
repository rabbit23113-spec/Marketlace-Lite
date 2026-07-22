import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreatePaymentCommand} from "../commands/createPayment.command";
import {InjectRepository} from "@nestjs/typeorm";
import {PaymentEntity} from "../../common/entities/payment.entity";
import {Repository} from "typeorm";
import {PinoLogger} from "nestjs-pino";
import {CurrencyEnum, YookassaService} from "@companix/yookassa";
import {Inject, InternalServerErrorException} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentHandler implements ICommandHandler<CreatePaymentCommand> {
  constructor(
    @InjectRepository(PaymentEntity) private repository: Repository<PaymentEntity>,
    private pino: PinoLogger,
    private yookassa: YookassaService,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
  ) {
  }

  async execute(command: CreatePaymentCommand): Promise<PaymentEntity> {
    try {
      const {orderId, userId, amount} = command.dto;

      const payment = await this.yookassa.payments.create({
        amount: {value: amount.toString(), currency: CurrencyEnum.RUB},
        confirmation: {type: "redirect", return_url: process.env.REDIRECT_URL!},
        capture: true,
        metadata: {orderId}
      })

      const paymentEntity: PaymentEntity = this.repository.create({
        currency: CurrencyEnum.RUB,
        userId,
        orderId,
        amount,
        providerPaymentId: payment.id,
        provider: "Yookassa",
        status: payment.status,
      })
      await this.repository.save(paymentEntity);
      this.pino.info("PAYMENT CREATED", payment)
      this.eventsClient.emit("events.create", {domain: "PAYMENTS", action: "CREATED", payload: paymentEntity});

      return paymentEntity;
    } catch (err) {
      // @ts-ignore
      this.pino.error(err.message);
      // @ts-ignore
      throw new InternalServerErrorException(err.message);
    }
  }
}
