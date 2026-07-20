import {ProductEntity} from "../../common/entities/product.entity";
import {CreateProductDto} from "../../common/dto/createProduct.dto";
import {Command} from "@nestjs/cqrs";

export class CreateProductCommand extends Command<ProductEntity> {
  constructor(public readonly dto: CreateProductDto) {
    super();
  }
}
