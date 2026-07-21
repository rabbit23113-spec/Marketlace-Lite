import {Command} from "@nestjs/cqrs";
import {CreateVerificationDto} from "../../common/dto/createVerification.dto";

export class CreateVerificationCommand extends Command<void> {
  constructor(public readonly dto: CreateVerificationDto) {
    super();
  }
}
