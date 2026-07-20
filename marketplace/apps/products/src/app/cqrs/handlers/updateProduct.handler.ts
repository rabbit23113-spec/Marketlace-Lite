import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateProductCommand} from "../commands/updateProduct.command";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductEntity} from "../../common/entities/product.entity";
import {Repository} from "typeorm";
import {NotFoundException} from "@nestjs/common";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
  constructor(
    @InjectRepository(ProductEntity) private repository: Repository<ProductEntity>,
    private pino: PinoLogger,
  ) {
  }

  async execute(command: UpdateProductCommand): Promise<ProductEntity> {
    const {productId, dto} = command;

    const product: ProductEntity | null = await this.repository.findOneBy({productId});
    if (!product) throw new NotFoundException("Product not found");

    await this.repository.update(productId, dto);
    this.pino.info("PRODUCT UPDATED", product);
    return product;
  }
}
