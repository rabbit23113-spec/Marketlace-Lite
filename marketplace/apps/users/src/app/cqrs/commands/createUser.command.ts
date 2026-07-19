import {Command} from "@nestjs/cqrs";
import {UserEntity} from "../../common/entities/user.entity";
import {CreateUserDto} from "../../common/dto/createUser.dto";

export class CreateUserCommand extends Command<UserEntity> {
  constructor(
    public readonly dto: CreateUserDto
  ) {
    super();
  }
}
