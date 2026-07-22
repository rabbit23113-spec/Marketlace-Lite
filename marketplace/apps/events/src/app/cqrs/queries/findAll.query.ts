import {Query} from "@nestjs/cqrs";
import {EventEntity} from "../../common/entities/event.entity";

export class FindAllQuery extends Query<EventEntity[]> {
  constructor() {
    super();
  }
}
