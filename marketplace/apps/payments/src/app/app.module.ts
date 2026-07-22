import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CqrsModule} from "@nestjs/cqrs";
import {LoggerModule} from "nestjs-pino";
import {ConfigModule} from "@nestjs/config";
import {YookassaModule} from '@companix/yookassa';
import {PaymentEntity} from "./common/entities/payment.entity";
import {CreatePaymentHandler} from "./cqrs/handlers/createPayment.handler";
import {WebhookHandler} from "./cqrs/handlers/handleWebhook.handler";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    username: 'root',
    password: 'root',
    database: 'payments',
    synchronize: true,
    autoLoadEntities: true,
    entities: [PaymentEntity],
  }),
    TypeOrmModule.forFeature([PaymentEntity]),
    CqrsModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === "production" ? "info" : "debug",
      }
    }),
    ConfigModule.forRoot(),
    YookassaModule.forRoot({
      shopId: String(process.env.YOOKASSA_SHOP_ID),
      apiKey: String(process.env.YOOKASSA_API_KEY)
    }),
    ClientsModule.register([
      {
        name: "EVENTS_CLIENT",
        transport: Transport.RMQ,
        options: {
          queue: "EVENTS_QUEUE",
          urls: ["amqp://rabbitmq:5672"]
        }
      },
    ])
  ],
  controllers: [AppController],
  providers: [AppService, CreatePaymentHandler, WebhookHandler],
})
export class AppModule {
}
