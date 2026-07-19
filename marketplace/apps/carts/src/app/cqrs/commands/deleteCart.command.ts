import {Command} from "@nestjs/cqrs";

export class DeleteCartCommand extends Command<void> {
  constructor(public readonly userId: string) {
    super();
  }
}
