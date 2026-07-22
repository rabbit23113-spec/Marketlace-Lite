import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {LoggerModule} from "nestjs-pino";
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    username: 'root',
    password: 'root',
    database: 'events',
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
