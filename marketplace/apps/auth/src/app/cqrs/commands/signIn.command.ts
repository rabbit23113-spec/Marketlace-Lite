import {Command} from "@nestjs/cqrs";
import {SignInDto} from "../../common/dto/authRequest.dto";
import {AuthResponseDto} from "../../common/dto/authResponse.dto";

export class SignInCommand extends Command<AuthResponseDto> {
  constructor(public readonly dto: SignInDto) {
    super();
  }
}
