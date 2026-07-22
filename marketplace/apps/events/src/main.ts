import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      queue: "EVENTS_QUEUE",
      urls: ["amqp://rabbitmq:5672"],
    }
  })
  await app.listen();
  Logger.log(
    `🚀 Events service is running`,
  );
}

bootstrap();
