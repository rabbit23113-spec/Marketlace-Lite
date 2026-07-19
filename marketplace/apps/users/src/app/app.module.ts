import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    username: 'root',
    password: 'root',
    database: 'users',
    synchronize: true,
    autoLoadEntities: true,
    entities: [],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
