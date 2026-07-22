import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateProductCommand} from "../commands/createProduct.command";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductEntity} from "../../common/entities/product.entity";
import {Repository} from "typeorm";
import {PinoLogger} from "nestjs-pino";
import {Inject} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(
    @InjectRepository(ProductEntity) private repository: Repository<ProductEntity>,
    private pino: PinoLogger,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
  ) {
  }

  async execute(command: CreateProductCommand): Promise<ProductEntity> {
    const {dto} = command;

    const product: ProductEntity = this.repository.create(dto);
    await this.repository.save(product);
    this.pino.info("PRODUCT CREATED", product);
    this.eventsClient.emit("events.create", {domain: "PRODUCTS", action: "CREATED", payload: product});
    return product;
  }
}
