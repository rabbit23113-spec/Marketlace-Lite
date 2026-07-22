import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CqrsModule} from "@nestjs/cqrs";
import {CartEntity} from "./common/entities/cart.entity";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {FindOneByIdHandler} from "./cqrs/handlers/findOneById.handler";
import {FindOneByUserIdHandler} from "./cqrs/handlers/findOneByUserId.handler";
import {CreateCartHandler} from "./cqrs/handlers/createCart.handler";
import {AddProductHandler} from "./cqrs/handlers/addProduct.handler";
import {RemoveProductHandler} from "./cqrs/handlers/removeProduct.handler";
import {ResetCartHandler} from "./cqrs/handlers/resetCart.handler";
import {LoggerModule} from "nestjs-pino";
import {DeleteCartHandler} from "./cqrs/handlers/deleteCart.handler";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    username: 'root',
    password: 'root',
    database: 'carts',
    synchronize: true,
    autoLoadEntities: true,
    entities: [CartEntity],
  }),
    TypeOrmModule.forFeature([CartEntity]),
    CqrsModule.forRoot(),
    ClientsModule.register([
      {
        name: "EVENTS_CLIENT",
        transport: Transport.RMQ,
        options: {
          queue: "EVENTS_QUEUE",
          urls: ["amqp://rabbitmq:5672"]
        }
      },
    ]),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === "production" ? "info" : "debug",
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService, FindOneByIdHandler, FindOneByUserIdHandler, CreateCartHandler, AddProductHandler, RemoveProductHandler, ResetCartHandler, DeleteCartHandler],
})
export class AppModule {
}
