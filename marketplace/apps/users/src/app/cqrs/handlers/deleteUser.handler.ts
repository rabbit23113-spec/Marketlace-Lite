import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteUserCommand} from "../commands/deleteUser.command";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../../common/entities/user.entity";
import {Repository} from "typeorm";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {
  }

  async execute(command: DeleteUserCommand): Promise<void> {
    const {userId} = command;
    const user: UserEntity | null = await this.repository.findOneBy({userId});
    if (!user) throw new NotFoundException("User does not exist");

    await this.repository.delete(userId);
  }
}
