import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindAllQuery} from "../queries/findAll.query";
import {InjectRepository} from "@nestjs/typeorm";
import {NotificationEntity} from "../../common/entities/notification.entity";
import {Repository} from "typeorm";

@QueryHandler(FindAllQuery)
export class FindAllHandler implements IQueryHandler<FindAllQuery> {
  constructor(@InjectRepository(NotificationEntity) private repository: Repository<NotificationEntity>) {
  }

  async execute(query: FindAllQuery): Promise<NotificationEntity[]> {
    return await this.repository.find();
  }
}
