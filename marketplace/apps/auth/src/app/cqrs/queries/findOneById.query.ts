import {Query} from "@nestjs/cqrs";
import {SessionEntity} from "../../common/entities/session.entity";

export class FindOneByIdQuery extends Query<SessionEntity> {
  constructor(public readonly sessionId: string) {
    super();
  }
}
