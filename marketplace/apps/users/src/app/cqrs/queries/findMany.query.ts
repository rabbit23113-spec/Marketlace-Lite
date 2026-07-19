import {Query} from "@nestjs/cqrs";
import {UserEntity} from "../../common/entities/user.entity";

export class FindManyQuery extends Query<UserEntity[]> {
  constructor() {
    super();
  }
}
