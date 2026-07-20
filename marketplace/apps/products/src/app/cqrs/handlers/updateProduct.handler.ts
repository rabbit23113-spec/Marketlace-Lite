import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateProductDto} from "../../common/dto/updateProduct.dto";
import {UpdateProductCommand} from "../commands/updateProduct.command";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductEntity} from "../../common/entities/product.entity";
import {Repository} from "typeorm";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
  constructor(@InjectRepository(ProductEntity) private repository: Repository<ProductEntity>) {
  }

  async execute(command: UpdateProductCommand): Promise<ProductEntity> {
    const {productId, dto} = command;

    const product: ProductEntity | null = await this.repository.findOneBy({productId});
    if (!product) throw new NotFoundException("Product not found");

    await this.repository.update(productId, dto);
    return product;
  }
}
