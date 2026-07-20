import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {ProductEntity} from "./common/entities/product.entity";
import {CreateProductDto} from "./common/dto/createProduct.dto";
import {UpdateProductDto} from "./common/dto/updateProduct.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("products.findAll")
  async findAll(): Promise<ProductEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern("products.findOneById")
  async findOneById(@Payload() payload: { productId: string }): Promise<ProductEntity> {
    return await this.appService.findOneById(payload.productId);
  }

  @MessagePattern("products.findByCategoryId")
  async findByCategoryId(@Payload() payload: { categoryId: string }): Promise<ProductEntity[]> {
    return await this.appService.findByCategoryId(payload.categoryId);
  }

  @MessagePattern("products.findByBrandId")
  async findByBrandId(@Payload() payload: { brandId: string }): Promise<ProductEntity[]> {
    return await this.appService.findByBrandId(payload.brandId);
  }

  @MessagePattern("products.create")
  async create(@Payload() payload: { dto: CreateProductDto }): Promise<ProductEntity> {
    return await this.appService.createProduct(payload.dto);
  }

  @MessagePattern("products.update")
  async updateOne(@Payload() payload: { productId: string, dto: UpdateProductDto }): Promise<ProductEntity> {
    const {productId, dto} = payload;
    return await this.appService.updateProduct(productId, dto);
  }

}
