import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {LoggerModule} from "nestjs-pino";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CqrsModule} from "@nestjs/cqrs";
import {NotificationEntity} from "./common/entities/notification.entity";
import * as path from "node:path";
import {MailerModule} from "@nestjs-modules/mailer";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {FindAllHandler} from "./cqrs/handlers/findAll.handler";
import {CreateVerificationHandler} from "./cqrs/handlers/createVerification.handler";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    username: 'root',
    password: 'root',
    database: 'notifications',
    synchronize: true,
    autoLoadEntities: true,
    entities: [NotificationEntity],
  }),
    TypeOrmModule.forFeature([NotificationEntity]),
    CqrsModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === "production" ? "info" : "debug",
      }
    }),
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: 'smtp.yandex.ru',
          port: 465,
          secure: true,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASS'),
          },
        },
        defaults: {
          from: '"No-reply" <no-reply@marketplacelite.com>',
        },
        template: {
          dir: path.join(__dirname, '..', 'templates'),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, FindAllHandler, CreateVerificationHandler],
})
export class AppModule {
}
