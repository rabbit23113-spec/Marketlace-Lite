import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {BrandEntity} from "./common/entities/brand.entity";
import {FindAllQuery} from "./cqrs/queries/findAll.query";
import {FindOneByIdQuery} from "./cqrs/queries/findOneById.query";
import {FindOneByNameQuery} from "./cqrs/queries/findOneByName.query";

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
}
