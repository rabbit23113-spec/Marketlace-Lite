import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindOneByNameQuery} from "../queries/findOneByName.query";
import {InjectRepository} from "@nestjs/typeorm";
import {BrandEntity} from "../../common/entities/brand.entity";
import {Repository} from "typeorm";
import {NotFoundError} from "rxjs";

@QueryHandler(FindOneByNameQuery)
export class FindOneByNameHandler implements IQueryHandler<FindOneByNameQuery> {
  constructor(@InjectRepository(BrandEntity) private repository: Repository<BrandEntity>) {
  }

  async execute(query: FindOneByNameQuery): Promise<BrandEntity> {
    const {name} = query;

    const brand: BrandEntity | null = await this.repository.findOneBy({name});
    if (!brand) throw new NotFoundError("Brand not found");
    return brand;
  }
}
