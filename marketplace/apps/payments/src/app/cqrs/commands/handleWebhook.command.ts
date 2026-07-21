import {Command} from "@nestjs/cqrs";

export class HandleWebhookCommand extends Command<void> {
  constructor(public readonly body: any) {
    super();
  }
}
