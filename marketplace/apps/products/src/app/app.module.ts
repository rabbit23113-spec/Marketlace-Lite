import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CqrsModule} from "@nestjs/cqrs";
import {LoggerModule} from "nestjs-pino";
import {ProductEntity} from "./common/entities/product.entity";
import {FindAllHandler} from "./cqrs/handlers/findAll.handler";
import {FindOneByIdHandler} from "./cqrs/handlers/findOneById.handler";
import {FindByCategoryIdHandler} from "./cqrs/handlers/findByCategoryId.handler";
import {FindByBrandIdHandler} from "./cqrs/handlers/findByBrandId.handler";
import {CreateProductHandler} from "./cqrs/handlers/createProduct.handler";
import {UpdateProductHandler} from "./cqrs/handlers/updateProduct.handler";
import {DeleteProductHandler} from "./cqrs/handlers/deleteProduct.handler";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    username: 'root',
    password: 'root',
    database: 'products',
    synchronize: true,
    autoLoadEntities: true,
    entities: [ProductEntity],
  }),
    TypeOrmModule.forFeature([ProductEntity]),
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
  providers: [AppService, FindAllHandler, FindOneByIdHandler, FindByCategoryIdHandler, FindByBrandIdHandler, CreateProductHandler, UpdateProductHandler, DeleteProductHandler],
})
export class AppModule {
}
