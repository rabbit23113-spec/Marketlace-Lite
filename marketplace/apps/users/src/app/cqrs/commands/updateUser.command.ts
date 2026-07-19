import {Command} from "@nestjs/cqrs";
import {UpdateUserDto} from "../../common/dto/updateUser.dto";
import {UserEntity} from "../../common/entities/user.entity";

export class UpdateUserCommand extends Command<UserEntity> {
  constructor(public readonly userId: string, public readonly dto: UpdateUserDto) {
    super();
  }
}
