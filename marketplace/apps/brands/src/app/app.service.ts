import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {BrandEntity} from "./common/entities/brand.entity";
import {FindAllQuery} from "./cqrs/queries/findAll.query";
import {FindOneByIdQuery} from "./cqrs/queries/findOneById.query";
import {FindOneByNameQuery} from "./cqrs/queries/findOneByName.query";
import {CreateBrandDto} from "./common/dto/createBrand.dto";
import {CreateBrandCommand} from "./cqrs/commands/createBrand.command";
import {UpdateBrandDto} from "./common/dto/updateBrand.dto";
import {UpdateBrandCommand} from "./cqrs/commands/updateBrand.command";

@Injectable()
export class AppService {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  async findAll(): Promise<BrandEntity[]> {
    return await this.queryBus.execute(new FindAllQuery());
  }

  async findOneById(brandId: string): Promise<BrandEntity> {
    return await this.queryBus.execute(new FindOneByIdQuery(brandId));
  }

  async findOneByName(name: string): Promise<BrandEntity> {
    return await this.queryBus.execute(new FindOneByNameQuery(name));
  }

  async create(dto: CreateBrandDto): Promise<BrandEntity> {
    return await this.commandBus.execute(new CreateBrandCommand(dto));
  }

  async updateOne(brandId: string, dto: UpdateBrandDto): Promise<BrandEntity> {
    return await this.commandBus.execute(new UpdateBrandCommand(brandId, dto));
  }
}
