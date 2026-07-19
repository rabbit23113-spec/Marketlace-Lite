import {UserEntity} from "../../common/entities/user.entity";
import {Query} from "@nestjs/cqrs";

export class FindOneByEmailQuery extends Query<UserEntity> {
  constructor(public email: string) {
    super();
  }
}
