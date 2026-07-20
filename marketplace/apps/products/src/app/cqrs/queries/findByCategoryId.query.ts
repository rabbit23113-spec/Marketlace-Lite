import {ProductEntity} from "../../common/entities/product.entity";
import {Query} from "@nestjs/cqrs";

export class FindByCategoryIdQuery extends Query<ProductEntity[]> {
  constructor(public readonly categoryId: string) {
    super();
  }
}
