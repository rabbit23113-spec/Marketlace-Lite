import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindOneByIdQuery} from "../queries/findOneById.query";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../../common/entities/user.entity";
import {Repository} from "typeorm";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(FindOneByIdQuery)
export class FindOneByIdHandler implements IQueryHandler<FindOneByIdQuery> {
  constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {
  }

  async execute(query: FindOneByIdQuery): Promise<UserEntity> {
    const { userId } = query;
    const user: UserEntity | null = await this.repository.findOneBy({ userId });
    if (!user) throw new NotFoundException("User does not exist");
    return user;
  }
}
