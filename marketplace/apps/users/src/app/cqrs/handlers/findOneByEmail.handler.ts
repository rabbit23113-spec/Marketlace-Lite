import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindOneByEmailQuery} from "../queries/findOneByEmail.query";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../../common/entities/user.entity";
import {Repository} from "typeorm";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(FindOneByEmailQuery)
export class FindOneByEmailHandler implements IQueryHandler<FindOneByEmailQuery> {
  constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {
  }

  async execute(query: FindOneByEmailQuery): Promise<UserEntity> {
    const {email} = query;
    const user: UserEntity | null = await this.repository.findOneBy({email});
    if (!user) throw new NotFoundException("User not found");
    return user;
  }
}
