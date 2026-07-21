import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdatePromotionCommand} from "../commands/updatePromotion.command";
import {InjectRepository} from "@nestjs/typeorm";
import {PromotionEntity} from "../../common/entities/promotion.entity";
import {Repository} from "typeorm";
import {PinoLogger} from "nestjs-pino";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(UpdatePromotionCommand)
export class UpdatePromotionHandler implements ICommandHandler<UpdatePromotionCommand> {
  constructor(
    @InjectRepository(PromotionEntity) private repository: Repository<PromotionEntity>,
    private pino: PinoLogger
  ) {
  }

  async execute(command: UpdatePromotionCommand): Promise<PromotionEntity> {
    const {promotionId, dto} = command;
    const promotion: PromotionEntity | null = await this.repository.findOneBy({promotionId});
    if (!promotion) throw new NotFoundException("Promotion not found");
    await this.repository.update(promotionId, dto);
    this.pino.info("PROMOTION UPDATED", promotion);
    return promotion;
  }
}
