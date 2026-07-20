import {Query} from "@nestjs/cqrs";
import {CategoryEntity} from "../../common/entities/category.entity";

export class FindAllQuery extends Query<CategoryEntity[]> {
  constructor() {
    super();
  }
}
