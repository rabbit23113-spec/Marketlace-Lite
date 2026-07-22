import {UpdateBrandCommand} from "../commands/updateBrand.command";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {BrandEntity} from "../../common/entities/brand.entity";
import {Repository} from "typeorm";
import {Inject, NotFoundException} from "@nestjs/common";
import {PinoLogger} from "nestjs-pino";
import {ClientProxy} from "@nestjs/microservices";

@CommandHandler(UpdateBrandCommand)
export class UpdateBrandHandler implements ICommandHandler<UpdateBrandCommand> {
  constructor(
    @InjectRepository(BrandEntity) private repository: Repository<BrandEntity>,
    private pino: PinoLogger,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
  ) {
  }

  async execute(command: UpdateBrandCommand): Promise<BrandEntity> {
    const {brandId, dto} = command;

    const brand: BrandEntity | null = await this.repository.findOneBy({brandId});
    if (!brand) throw new NotFoundException("Brand not found");

    await this.repository.update(brandId, dto);
    this.pino.info("BRAND UPDATED", brand);
    this.eventsClient.emit("events.create", {domain: "BRANDS", action: "UPDATED", payload: brand});
    return brand;
  }
}
