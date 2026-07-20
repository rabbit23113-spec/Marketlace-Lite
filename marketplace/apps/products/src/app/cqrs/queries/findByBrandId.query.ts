import {Query} from "@nestjs/cqrs";
import {ProductEntity} from "../../common/entities/product.entity";

export class FindByBrandIdQuery extends Query<ProductEntity[]> {
  constructor(public readonly brandId: string) {
    super();
  }
}
