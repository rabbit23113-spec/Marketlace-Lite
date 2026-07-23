import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {LoggerModule} from "nestjs-pino";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CqrsModule} from "@nestjs/cqrs";
import {FindOneByOrderIdHandler} from "./cqrs/handlers/findOneByOrderId.handler";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    username: 'root',
    password: 'root',
    database: 'delivery',
    synchronize: true,
    autoLoadEntities: true,
    entities: [],
  }),
    TypeOrmModule.forFeature([]),
    CqrsModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === "production" ? "info" : "debug",
      }
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
  providers: [AppService, FindOneByOrderIdHandler],
})
export class AppModule {
}
