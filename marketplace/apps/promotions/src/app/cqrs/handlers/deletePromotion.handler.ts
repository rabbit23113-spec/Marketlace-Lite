import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeletePromotionCommand} from "../commands/deletePromotion.command";
import {InjectRepository} from "@nestjs/typeorm";
import {PromotionEntity} from "../../common/entities/promotion.entity";
import {Repository} from "typeorm";
import {PinoLogger} from "nestjs-pino";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeletePromotionCommand)
export class DeletePromotionHandler implements ICommandHandler<DeletePromotionCommand> {
  constructor(
    @InjectRepository(PromotionEntity) private repository: Repository<PromotionEntity>,
    private pino: PinoLogger
  ) {
  }

  async execute(command: DeletePromotionCommand): Promise<void> {
    const {promotionId} = command;
    const promotion: PromotionEntity | null = await this.repository.findOneBy({promotionId});
    if (!promotion) throw new NotFoundException(`Promotion not found`);

    await this.repository.delete(promotionId);
    this.pino.info(`PROMOTION WITH ID ${promotionId} DELETED`);
  }
}
