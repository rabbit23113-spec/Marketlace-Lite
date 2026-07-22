import {CreateEventDto} from "../../common/dto/createEvent.dto";
import {Command} from "@nestjs/cqrs";

export class CreateEventCommand extends Command<void> {
  constructor(public readonly dto: CreateEventDto) {
    super();
  }
}
