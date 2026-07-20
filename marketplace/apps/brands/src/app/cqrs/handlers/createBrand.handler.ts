import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateBrandCommand} from "../commands/createBrand.command";
import {InjectRepository} from "@nestjs/typeorm";
import {BrandEntity} from "../../common/entities/brand.entity";
import {Repository} from "typeorm";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(CreateBrandCommand)
export class CreateBrandHandler implements ICommandHandler<CreateBrandCommand> {
  constructor(
    @InjectRepository(BrandEntity) private repository: Repository<BrandEntity>,
    private pino: PinoLogger,
  ) {
  }

  async execute(command: CreateBrandCommand): Promise<BrandEntity> {
    const {dto} = command;
    const brand: BrandEntity = this.repository.create(dto);
    await this.repository.save(brand);
    this.pino.info("BRAND CREATED", brand);
    return brand;
  }
}
