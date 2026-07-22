import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateBrandCommand} from "../commands/createBrand.command";
import {InjectRepository} from "@nestjs/typeorm";
import {BrandEntity} from "../../common/entities/brand.entity";
import {Repository} from "typeorm";
import {PinoLogger} from "nestjs-pino";
import {Inject} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";

@CommandHandler(CreateBrandCommand)
export class CreateBrandHandler implements ICommandHandler<CreateBrandCommand> {
  constructor(
    @InjectRepository(BrandEntity) private repository: Repository<BrandEntity>,
    private pino: PinoLogger,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
  ) {
  }

  async execute(command: CreateBrandCommand): Promise<BrandEntity> {
    const {dto} = command;
    const brand: BrandEntity = this.repository.create(dto);
    await this.repository.save(brand);
    this.pino.info("BRAND CREATED", brand);
    this.eventsClient.emit("events.create", {domain: "BRANDS", action: "CREATED", payload: brand});
    return brand;
  }
}
