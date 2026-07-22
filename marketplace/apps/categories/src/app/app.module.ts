import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {LoggerModule} from "nestjs-pino";
import {CqrsModule} from "@nestjs/cqrs";
import {FindAllHandler} from "./cqrs/handlers/findAll.handler";
import {CreateCategoryHandler} from "./cqrs/handlers/createCategory.handler";
import {CategoryEntity} from "./common/entities/category.entity";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    username: 'root',
    password: 'root',
    database: 'categories',
    synchronize: true,
    autoLoadEntities: true,
    entities: [CategoryEntity],
  }),
    TypeOrmModule.forFeature([CategoryEntity]),
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
  providers: [AppService, FindAllHandler, CreateCategoryHandler],
})
export class AppModule {
}
