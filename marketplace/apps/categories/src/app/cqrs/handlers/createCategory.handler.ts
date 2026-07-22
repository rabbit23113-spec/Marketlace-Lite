import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateCategoryCommand} from "../commands/createCategory.command";
import {InjectRepository} from "@nestjs/typeorm";
import {CategoryEntity} from "../../common/entities/category.entity";
import {Repository} from "typeorm";
import {PinoLogger} from "nestjs-pino";
import {Inject} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand> {
  constructor(
    @InjectRepository(CategoryEntity) private repository: Repository<CategoryEntity>,
    private pino: PinoLogger,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
  ) {
  }

  async execute(command: CreateCategoryCommand): Promise<CategoryEntity> {
    const {name} = command;

    const category: CategoryEntity = this.repository.create({name});
    await this.repository.save(category);
    this.pino.info("CATEGORY CREATED", category);
    this.eventsClient.emit("events.create", {domain: "CATEGORIES", action: "CREATED", payload: category});
    return category;
  }

}
