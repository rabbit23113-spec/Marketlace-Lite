import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./common/entities/user.entity";
import {CqrsModule} from "@nestjs/cqrs";

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
