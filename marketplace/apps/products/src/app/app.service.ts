import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ProductEntity} from "./common/entities/product.entity";
import {FindAllQuery} from "./cqrs/queries/findAll.query";
import {FindOneByIdQuery} from "./cqrs/queries/findOneById.query";
import {FindByCategoryIdQuery} from "./cqrs/queries/findByCategoryId.query";

@Injectable()
export class AppService {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.queryBus.execute(new FindAllQuery());
  }

  async findOneById(productId: string): Promise<ProductEntity> {
    return await this.queryBus.execute(new FindOneByIdQuery(productId));
  }

  async findByCategoryId(categoryId: string): Promise<ProductEntity[]> {
    return await this.queryBus.execute(new FindByCategoryIdQuery(categoryId));
  }
}
