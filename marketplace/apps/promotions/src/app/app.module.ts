import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CqrsModule} from "@nestjs/cqrs";
import {LoggerModule} from "nestjs-pino";
import {PromotionEntity} from "./common/entities/promotion.entity";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    username: 'root',
    password: 'root',
    database: 'promotions',
    synchronize: true,
    autoLoadEntities: true,
    entities: [PromotionEntity],
  }),
    TypeOrmModule.forFeature([PromotionEntity]),
    CqrsModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === "production" ? "info" : "debug",
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
