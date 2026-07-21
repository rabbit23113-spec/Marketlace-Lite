import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreatePromotionCommand} from "../commands/createPromotion.command";
import {InjectRepository} from "@nestjs/typeorm";
import {PromotionEntity} from "../../common/entities/promotion.entity";
import {Repository} from "typeorm";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(CreatePromotionCommand)
export class CreatePromotionHandler implements ICommandHandler<CreatePromotionCommand> {
  constructor(
    @InjectRepository(PromotionEntity) private repository: Repository<PromotionEntity>,
    private pino: PinoLogger
  ) {
  }

  async execute(command: CreatePromotionCommand): Promise<PromotionEntity> {
    const promotion: PromotionEntity = this.repository.create(command.dto);
    await this.repository.save(promotion);
    return promotion;
  }
}
