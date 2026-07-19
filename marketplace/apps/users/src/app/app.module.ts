import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./common/entities/user.entity";
import {CqrsModule} from "@nestjs/cqrs";
import {CreateUserHandler} from "./cqrs/handlers/createUser.handler";
import {UpdateUserHandler} from "./cqrs/handlers/updateUser.handler";
import {DeleteUserHandler} from "./cqrs/handlers/deleteUser.handler";
import {FindOneByIdHandler} from "./cqrs/handlers/findOneById.handler";
import {FindOneByEmailHandler} from "./cqrs/handlers/findOneByEmail.handler";
import {FindManyHandler} from "./cqrs/handlers/findMany.handler";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {LoggerModule} from "nestjs-pino";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    username: 'root',
    password: 'root',
    database: 'users',
    synchronize: true,
    autoLoadEntities: true,
    entities: [UserEntity],
  }),
    TypeOrmModule.forFeature([UserEntity]),
    CqrsModule.forRoot(),
    ClientsModule.register([
      {
        name: "CARTS_CLIENT",
        transport: Transport.RMQ,
        options: {
          queue: "CARTS_QUEUE",
          urls: ["amqp://rabbitmq:5672"]
        }
      },
    ]),
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info',
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService, CreateUserHandler, UpdateUserHandler, DeleteUserHandler, FindOneByIdHandler, FindOneByEmailHandler, FindManyHandler],
})
export class AppModule {
}
