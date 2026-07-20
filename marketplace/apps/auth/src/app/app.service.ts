import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {SessionEntity} from "./common/entities/session.entity";
import {FindOneByIdQuery} from "./cqrs/queries/findOneById.query";
import {FindByUserIdQuery} from "./cqrs/queries/findByUserId.query";
import {SignInDto} from "./common/dto/authRequest.dto";
import {AuthResponseDto} from "./common/dto/authResponse.dto";
import {SignInCommand} from "./cqrs/commands/signIn.command";

@Injectable()
export class AppService {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {
  }

  async findByUserId(userId: string): Promise<SessionEntity[]> {
    return await this.queryBus.execute(new FindByUserIdQuery(userId));
  }

  async findOneById(sessionId: string): Promise<SessionEntity> {
    return await this.queryBus.execute(new FindOneByIdQuery(sessionId));
  }

  async signIn(dto: SignInDto): Promise<AuthResponseDto> {
    return await this.commandBus.execute(new SignInCommand(dto));
  }
}
