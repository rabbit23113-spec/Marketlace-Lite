import {ProductEntity} from "../../common/entities/product.entity";
import {UpdateProductDto} from "../../common/dto/updateProduct.dto";
import {Query} from "@nestjs/cqrs";

export class UpdateProductCommand extends Query<ProductEntity> {
  constructor(public readonly productId: string, public readonly dto: UpdateProductDto) {
    super();
  }
}
