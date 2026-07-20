import {Command} from "@nestjs/cqrs";
import {AuthResponseDto} from "../../common/dto/authResponse.dto";
import {SignUpDto} from "../../common/dto/signUp.dto";

export class SignUpCommand extends Command<AuthResponseDto> {
  constructor(public readonly dto: SignUpDto) {
    super();
  }
}
