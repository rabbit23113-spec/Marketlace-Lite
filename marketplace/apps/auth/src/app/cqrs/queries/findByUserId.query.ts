import {Query} from "@nestjs/cqrs";
import {SessionEntity} from "../../common/entities/session.entity";

export class FindByUserIdQuery extends Query<SessionEntity[]> {
  constructor(public readonly userId: string) {
    super();
  }
}
