import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindByUserIdQuery} from "../queries/findByUserId.query";
import {InjectRepository} from "@nestjs/typeorm";
import {SessionEntity} from "../../common/entities/session.entity";
import {Repository} from "typeorm";

@QueryHandler(FindByUserIdQuery)
export class FindByUserIdHandler implements IQueryHandler<FindByUserIdQuery> {
  constructor(@InjectRepository(SessionEntity) private repository: Repository<SessionEntity>) {
  }

  async execute(query: FindByUserIdQuery): Promise<SessionEntity[]> {
    const {userId} = query;
    return await this.repository.findBy({userId});
  }
}
