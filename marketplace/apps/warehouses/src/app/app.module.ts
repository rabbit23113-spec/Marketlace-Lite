import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {LoggerModule} from "nestjs-pino";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CqrsModule} from "@nestjs/cqrs";
import {FindAllHandler} from "./cqrs/handlers/findAll.handler";
import {FindOneByIdHandler} from "./cqrs/handlers/findOneById.handler";
import {WarehouseEntity} from "./common/entities/warehouse.entity";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    username: 'root',
    password: 'root',
    database: 'warehouses',
    synchronize: true,
    autoLoadEntities: true,
    entities: [WarehouseEntity],
  }),
    TypeOrmModule.forFeature([WarehouseEntity]),
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
  providers: [AppService, FindAllHandler, FindOneByIdHandler],
})
export class AppModule {
}
