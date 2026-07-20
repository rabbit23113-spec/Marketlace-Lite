import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CqrsModule} from "@nestjs/cqrs";
import {LoggerModule} from "nestjs-pino";
import {ProductEntity} from "./common/entities/product.entity";
import {FindAllHandler} from "./cqrs/handlers/findAll.handler";

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
  ],
  controllers: [AppController],
  providers: [AppService, FindAllHandler],
})
export class AppModule {
}
