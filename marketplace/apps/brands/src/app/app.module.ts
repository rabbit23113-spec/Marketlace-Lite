import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BrandEntity} from "./common/entities/brand.entity";
import {LoggerModule} from "nestjs-pino";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    username: 'root',
    password: 'root',
    database: 'brands',
    synchronize: true,
    autoLoadEntities: true,
    entities: [BrandEntity],
  }),
    TypeOrmModule.forFeature([BrandEntity]),
    CqrsModule.forRoot(),
    ClientsModule.register([
      {
        name: "USERS_CLIENT",
        transport: Transport.RMQ,
        options: {
          queue: "USERS_QUEUE",
          urls: ["amqp://rabbitmq:5672"]
        }
      },
    ]),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === "production" ? "info" : "debug",
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
