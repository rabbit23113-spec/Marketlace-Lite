import {Query} from "@nestjs/cqrs";
import {ProductEntity} from "../../common/entities/product.entity";

export class FindAllQuery extends Query<ProductEntity[]> {
  constructor() {
    super();
  }
}
