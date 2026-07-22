import {Query} from "@nestjs/cqrs";
import {ReviewEntity} from "../../common/entities/review.entity";

export class FindAllQuery extends Query<ReviewEntity[]> {
  constructor() {
    super();
  }
}
