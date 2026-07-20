import {Command} from "@nestjs/cqrs";
import {BrandEntity} from "../../common/entities/brand.entity";
import {UpdateBrandDto} from "../../common/dto/updateBrand.dto";

export class UpdateBrandCommand extends Command<BrandEntity> {
  constructor(public readonly brandId: string, public readonly dto: UpdateBrandDto) {
    super();
  }
}
