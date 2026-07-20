import {Query} from "@nestjs/cqrs";
import {BrandEntity} from "../../common/entities/brand.entity";

export class FindAllQuery extends Query<BrandEntity[]> {
  constructor() {
    super();
  }
}
