import {UserEntity} from "../../common/entities/user.entity";
import {Query} from "@nestjs/cqrs";

export class FindOneByIdQuery extends Query<UserEntity> {
  constructor(public readonly userId: string) {
    super();
  }
}
