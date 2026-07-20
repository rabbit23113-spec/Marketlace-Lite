import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ProductEntity} from "./common/entities/product.entity";
import {FindAllQuery} from "./cqrs/queries/findAll.query";
import {FindOneByIdQuery} from "./cqrs/queries/findOneById.query";
import {FindByCategoryIdQuery} from "./cqrs/queries/findByCategoryId.query";
import {FindByBrandIdQuery} from "./cqrs/queries/findByBrandId.query";
import {CreateProductDto} from "./common/dto/createProduct.dto";
import {CreateProductCommand} from "./cqrs/commands/createProduct.command";
import {UpdateProductDto} from "./common/dto/updateProduct.dto";
import {UpdateProductCommand} from "./cqrs/commands/updateProduct.command";
import {DeleteProductCommand} from "./cqrs/commands/deleteProduct.command";

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

  async findByBrandId(brandId: string): Promise<ProductEntity[]> {
    return await this.queryBus.execute(new FindByBrandIdQuery(brandId));
  }

  async createProduct(dto: CreateProductDto): Promise<ProductEntity> {
    return await this.commandBus.execute(new CreateProductCommand(dto));
  }

  async updateProduct(productId: string, dto: UpdateProductDto): Promise<ProductEntity> {
    return await this.commandBus.execute(new UpdateProductCommand(productId, dto));
  }

  async deleteProduct(productId: string): Promise<void> {
    await this.commandBus.execute(new DeleteProductCommand(productId));
  }
}
