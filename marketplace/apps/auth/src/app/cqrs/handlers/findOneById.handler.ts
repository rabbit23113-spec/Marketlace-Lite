import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindOneByIdQuery} from "../queries/findOneById.query";
import {InjectRepository} from "@nestjs/typeorm";
import {SessionEntity} from "../../common/entities/session.entity";
import {Repository} from "typeorm";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(FindOneByIdQuery)
export class FindOneByIdHandler implements IQueryHandler<FindOneByIdQuery> {
  constructor(@InjectRepository(SessionEntity) private readonly repository: Repository<SessionEntity>) {
  }

  async execute(query: FindOneByIdQuery): Promise<SessionEntity> {
    const {sessionId} = query;
    const session: SessionEntity | null = await this.repository.findOneBy({ sessionId });
    if (!session) throw new NotFoundException("Session not found");
    return session;
  }
}
