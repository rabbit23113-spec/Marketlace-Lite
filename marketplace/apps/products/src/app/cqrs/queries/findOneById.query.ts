import {Query} from "@nestjs/cqrs";
import {ProductEntity} from "../../common/entities/product.entity";

export class FindOneByIdQuery extends Query<ProductEntity> {
  constructor(public readonly productId: string) {
    super();
  }
}
