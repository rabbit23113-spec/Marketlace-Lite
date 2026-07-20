import {Query} from "@nestjs/cqrs";
import {BrandEntity} from "../../common/entities/brand.entity";

export class FindOneByNameQuery extends Query<BrandEntity> {
  constructor(public readonly name: string) {
    super();
  }
}
