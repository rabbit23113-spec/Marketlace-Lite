import {Strategy} from "passport-local";
import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {AppService} from "../app.service";
import {UserDto} from "../common/dto/user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private service: AppService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserDto> {
    // validate in auth service
  }
}
