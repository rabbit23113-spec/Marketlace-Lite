import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CqrsModule} from "@nestjs/cqrs";
import {LoggerModule} from "nestjs-pino";
import {FindByWarehouseIdHandler} from "./cqrs/handlers/findByWarehouseId.handler";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    username: 'root',
    password: 'root',
    database: 'inventories',
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
  providers: [AppService, FindByWarehouseIdHandler],
})
export class AppModule {
}
