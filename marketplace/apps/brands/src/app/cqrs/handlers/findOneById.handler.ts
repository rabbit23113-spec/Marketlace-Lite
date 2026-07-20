import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindOneByIdQuery} from "../queries/findOneById.query";
import {InjectRepository} from "@nestjs/typeorm";
import {BrandEntity} from "../../common/entities/brand.entity";
import {Repository} from "typeorm";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(FindOneByIdQuery)
export class FindOneByIdHandler implements IQueryHandler<FindOneByIdQuery> {
  constructor(@InjectRepository(BrandEntity) private repository: Repository<BrandEntity>) {
  }

  async execute(query: FindOneByIdQuery): Promise<BrandEntity> {
    const {brandId} = query;

    const brand: BrandEntity | null = await this.repository.findOneBy({brandId});
    if (!brand) throw new NotFoundException("Brand not found");
    return brand;
  }
}
