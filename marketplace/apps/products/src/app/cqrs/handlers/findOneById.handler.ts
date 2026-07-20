import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindOneByIdQuery} from "../queries/findOneById.query";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductEntity} from "../../common/entities/product.entity";
import {Repository} from "typeorm";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(FindOneByIdQuery)
export class FindOneByIdHandler implements IQueryHandler<FindOneByIdQuery> {
  constructor(@InjectRepository(ProductEntity) private repository: Repository<ProductEntity>) {
  }

  async execute(query: FindOneByIdQuery): Promise<ProductEntity> {
    const {productId} = query;

    const product: ProductEntity | null = await this.repository.findOneBy({productId});
    if (!product) throw new NotFoundException("Product not found");
    return product;
  }
}
