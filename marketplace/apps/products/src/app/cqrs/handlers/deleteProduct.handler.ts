import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteProductCommand} from "../commands/deleteProduct.command";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductEntity} from "../../common/entities/product.entity";
import {Repository} from "typeorm";
import {PinoLogger} from "nestjs-pino";
import {Inject, NotFoundException} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
  constructor(
    @InjectRepository(ProductEntity) private repository: Repository<ProductEntity>,
    private pino: PinoLogger,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
  ) {
  }

  async execute(command: DeleteProductCommand): Promise<void> {
    const {productId} = command;
    const product: ProductEntity | null = await this.repository.findOneBy({productId});
    if (!product) throw new NotFoundException("Product not found");
    await this.repository.delete(productId);
    this.pino.info("PRODUCT DELETED", product);
    this.eventsClient.emit("events.create", {domain: "PRODUCTS", action: "DELETED", payload: product});
  }
}
