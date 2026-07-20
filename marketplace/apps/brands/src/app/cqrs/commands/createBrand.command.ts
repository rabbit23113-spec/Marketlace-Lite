import {Command} from "@nestjs/cqrs";
import {CreateBrandDto} from "../../common/dto/createBrand.dto";
import {BrandEntity} from "../../common/entities/brand.entity";

export class CreateBrandCommand extends Command<BrandEntity> {
  constructor(public readonly dto: CreateBrandDto) {
    super();
  }
}
