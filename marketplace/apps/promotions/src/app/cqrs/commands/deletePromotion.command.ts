import {Command} from "@nestjs/cqrs";

export class DeletePromotionCommand extends Command<void> {
  constructor(public readonly promotionId: string) {
    super();
  }
}
