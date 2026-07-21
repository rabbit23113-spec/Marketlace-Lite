import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {NotificationEntity} from "./common/entities/notification.entity";
import {FindAllQuery} from "./cqrs/queries/findAll.query";
import {CreateVerificationCommand} from "./cqrs/commands/createVerification.command";
import {CreateVerificationDto} from "./common/dto/createVerification.dto";

@Injectable()
export class AppService {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  async findAll(): Promise<NotificationEntity[]> {
    return await this.queryBus.execute(new FindAllQuery());
  }

  async sendVerification(dto: CreateVerificationDto): Promise<void> {
    await this.commandBus.execute(new CreateVerificationCommand(dto));
  }
}
