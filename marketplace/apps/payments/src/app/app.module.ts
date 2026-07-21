import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CqrsModule} from "@nestjs/cqrs";
import {LoggerModule} from "nestjs-pino";
import {ConfigModule} from "@nestjs/config";
import {YookassaModule} from '@companix/yookassa';
import {PaymentEntity} from "./common/entities/payment.entity";

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
