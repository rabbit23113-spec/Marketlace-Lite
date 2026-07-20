import {UpdateBrandCommand} from "../commands/updateBrand.command";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {BrandEntity} from "../../common/entities/brand.entity";
import {Repository} from "typeorm";
import {NotFoundException} from "@nestjs/common";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(UpdateBrandCommand)
export class UpdateBrandHandler implements ICommandHandler<UpdateBrandCommand> {
  constructor(
    @InjectRepository(BrandEntity) private repository: Repository<BrandEntity>,
    private pino: PinoLogger
  ) {
  }

  async execute(command: UpdateBrandCommand): Promise<BrandEntity> {
    const {brandId, dto} = command;

    const brand: BrandEntity | null = await this.repository.findOneBy({brandId});
    if (!brand) throw new NotFoundException("Brand not found");

    await this.repository.update(brandId, dto);
    this.pino.info("BRAND UPDATED", brand);
    return brand;
  }
}
