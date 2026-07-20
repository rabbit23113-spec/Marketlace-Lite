import {BrandEntity} from "../../common/entities/brand.entity";
import {Query} from "@nestjs/cqrs";

export class FindOneByIdQuery extends Query<BrandEntity> {
  constructor(public readonly brandId: string) {
    super();
  }
}
