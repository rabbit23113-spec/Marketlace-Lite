import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {BrandEntity} from "./common/entities/brand.entity";
import {CreateBrandDto} from "./common/dto/createBrand.dto";
import {UpdateBrandDto} from "./common/dto/updateBrand.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("brands.findAll")
  async findAll(): Promise<BrandEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern("brand.findOneById")
  async findOneById(@Payload() payload: { brandId: string }): Promise<BrandEntity> {
    return await this.appService.findOneById(payload.brandId);
  }

  @MessagePattern("brand.findOneByName")
  async findOneByName(@Payload() payload: { name: string }): Promise<BrandEntity> {
    return await this.appService.findOneByName(payload.name);
  }

  @MessagePattern("brand.create")
  async create(@Payload() payload: { dto: CreateBrandDto }): Promise<BrandEntity> {
    return await this.appService.create(payload.dto);
  }

  @MessagePattern("brand.updateOne")
  async updateOne(@Payload() payload: { brandId: string, dto: UpdateBrandDto }): Promise<BrandEntity> {
    const {brandId, dto} = payload;
    return await this.appService.updateOne(brandId, dto);
  }

}
