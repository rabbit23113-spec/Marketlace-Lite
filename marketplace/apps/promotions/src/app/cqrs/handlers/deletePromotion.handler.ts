import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeletePromotionCommand} from "../commands/deletePromotion.command";
import {InjectRepository} from "@nestjs/typeorm";
import {PromotionEntity} from "../../common/entities/promotion.entity";
import {Repository} from "typeorm";
import {PinoLogger} from "nestjs-pino";
import {Inject, NotFoundException} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";

@CommandHandler(DeletePromotionCommand)
export class DeletePromotionHandler implements ICommandHandler<DeletePromotionCommand> {
  constructor(
    @InjectRepository(PromotionEntity) private repository: Repository<PromotionEntity>,
    private pino: PinoLogger,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
  ) {
  }

  async execute(command: DeletePromotionCommand): Promise<void> {
    const {promotionId} = command;
    const promotion: PromotionEntity | null = await this.repository.findOneBy({promotionId});
    if (!promotion) throw new NotFoundException(`Promotion not found`);

    await this.repository.delete(promotionId);
    this.pino.info(`PROMOTION WITH ID ${promotionId} DELETED`);
    this.eventsClient.emit("events.create", {domain: "PROMOTIONS", action: "DELETED", payload: promotion});
  }
}
