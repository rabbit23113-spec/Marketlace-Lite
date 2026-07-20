import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateProductCommand} from "../commands/createProduct.command";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductEntity} from "../../common/entities/product.entity";
import {Repository} from "typeorm";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(
    @InjectRepository(ProductEntity) private repository: Repository<ProductEntity>,
    private pino: PinoLogger,
  ) {
  }

  async execute(command: CreateProductCommand): Promise<ProductEntity> {
    const {dto} = command;

    const product: ProductEntity = this.repository.create(dto);
    await this.repository.save(product);
    this.pino.info("PRODUCT CREATED", product);
    return product;
  }
}
