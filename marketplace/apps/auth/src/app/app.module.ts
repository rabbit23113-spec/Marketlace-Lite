import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LoggerModule} from "nestjs-pino";
import {CqrsModule} from "@nestjs/cqrs";
import {SessionEntity} from "./common/entities/session.entity";
import {JwtModule} from "@nestjs/jwt";
import {SignInHandler} from "./cqrs/handlers/signIn.handler";
import {FindByUserIdHandler} from "./cqrs/handlers/findByUserId.handler";
import {FindOneByIdHandler} from "./cqrs/handlers/findOneById.handler";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    username: 'root',
    password: 'root',
    database: 'auth',
    synchronize: true,
    autoLoadEntities: true,
    entities: [SessionEntity],
  }),
    TypeOrmModule.forFeature([SessionEntity]),
    CqrsModule.forRoot(),
    ClientsModule.register([
      {
        name: "USERS_CLIENT",
        transport: Transport.RMQ,
        options: {
          queue: "USERS_QUEUE",
          urls: ["amqp://rabbitmq:5672"]
        }
      },
    ]),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === "production" ? "info" : "debug",
      }
    }),
    JwtModule.register({
      secret: "secret",
      signOptions: {
        expiresIn: '10m'
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService, FindOneByIdHandler, FindByUserIdHandler, SignInHandler],
})
export class AppModule {
}
