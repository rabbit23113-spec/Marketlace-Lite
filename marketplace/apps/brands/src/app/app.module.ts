import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BrandEntity} from "./common/entities/brand.entity";
import {LoggerModule} from "nestjs-pino";
import {FindAllHandler} from "./cqrs/handlers/findAll.handler";
import {FindOneByIdHandler} from "./cqrs/handlers/findOneById.handler";
import {FindOneByNameHandler} from "./cqrs/handlers/findOneByName.handler";
import {CreateBrandHandler} from "./cqrs/handlers/createBrand.handler";

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
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === "production" ? "info" : "debug",
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService, FindAllHandler, FindOneByIdHandler, FindOneByNameHandler, CreateBrandHandler],
})
export class AppModule {
}
