import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindManyQuery} from "../queries/findMany.query";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../../common/entities/user.entity";
import {Repository} from "typeorm";

@QueryHandler(FindManyQuery)
export class FindManyHandler implements IQueryHandler<FindManyQuery> {
  constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {
  }

  async execute(): Promise<UserEntity[]> {
    return await this.repository.find();
  }
}
