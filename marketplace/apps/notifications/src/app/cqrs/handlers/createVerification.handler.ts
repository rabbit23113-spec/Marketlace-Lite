import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateVerificationCommand} from "../commands/createVerification.command";
import {InjectRepository} from "@nestjs/typeorm";
import {NotificationEntity} from "../../common/entities/notification.entity";
import {Repository} from "typeorm";
import {PinoLogger} from "nestjs-pino";
import {MailerService} from "@nestjs-modules/mailer";
import {Inject, InternalServerErrorException} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";

@CommandHandler(CreateVerificationCommand)
export class CreateVerificationHandler implements ICommandHandler<CreateVerificationCommand> {
  constructor(
    @InjectRepository(NotificationEntity) private repository: Repository<NotificationEntity>,
    private pino: PinoLogger,
    private mailer: MailerService,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
  ) {
  }

  async execute(command: CreateVerificationCommand): Promise<void> {
    try {
      const {to, receiverId, verificationLink} = command.dto;
      const mail = await this.mailer.sendMail({
        from: "Marketplace-lite Team",
        subject: "Завершение регистрации",
        to,
        template: "verification",
        context: {
          verificationLink,
        }
      })
      this.pino.info("MAIL SENT", mail);
      const notification: NotificationEntity = this.repository.create({
        type: "email verification",
        receiverId,
        message: `
          <h1>Подтвердите адрес электронной почты</h1>
          <p>Для получения полного доступа перейдите по ссылке: ${verificationLink}</p>
          <h5>С уважением, команда Marketplace-Lite</h5>
        `,
      })
      await this.repository.save(notification);
      this.eventsClient.emit("events.create", {domain: "NOTIFICATIONS", action: "CREATED", payload: notification});
    } catch (err) {
      // @ts-ignore
      this.pino.error(err.message)
      // @ts-ignore
      throw new InternalServerErrorException(err.message)
    }
  }
}
