import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdatePromotionCommand} from "../commands/updatePromotion.command";
import {InjectRepository} from "@nestjs/typeorm";
import {PromotionEntity} from "../../common/entities/promotion.entity";
import {Repository} from "typeorm";
import {PinoLogger} from "nestjs-pino";
import {Inject, NotFoundException} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";

@CommandHandler(UpdatePromotionCommand)
export class UpdatePromotionHandler implements ICommandHandler<UpdatePromotionCommand> {
  constructor(
    @InjectRepository(PromotionEntity) private repository: Repository<PromotionEntity>,
    private pino: PinoLogger,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
  ) {
  }

  async execute(command: UpdatePromotionCommand): Promise<PromotionEntity> {
    const {promotionId, dto} = command;
    const promotion: PromotionEntity | null = await this.repository.findOneBy({promotionId});
    if (!promotion) throw new NotFoundException("Promotion not found");
    await this.repository.update(promotionId, dto);
    this.pino.info("PROMOTION UPDATED", promotion);
    this.eventsClient.emit("events.create", {domain: "PROMOTIONS", action: "UPDATED", payload: promotion});
    return promotion;
  }
}
