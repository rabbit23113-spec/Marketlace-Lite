import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CqrsModule} from "@nestjs/cqrs";
import {CartEntity} from "./common/entities/cart.entity";
import {ClientsModule, Transport} from "@nestjs/microservices";

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
        name: "USERS_CLIENT",
        transport: Transport.RMQ,
        options: {
          queue: "USERS_QUEUE",
          urls: ["amqp://rabbitmq:5672"]
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
