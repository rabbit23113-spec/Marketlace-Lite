import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateCategoryCommand} from "../commands/createCategory.command";
import {InjectRepository} from "@nestjs/typeorm";
import {CategoryEntity} from "../../common/entities/category.entity";
import {Repository} from "typeorm";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand> {
  constructor(
    @InjectRepository(CategoryEntity) private repository: Repository<CategoryEntity>,
    private pino: PinoLogger
  ) {
  }

  async execute(command: CreateCategoryCommand): Promise<CategoryEntity> {
    const {name} = command;

    const category: CategoryEntity = this.repository.create({name});
    await this.repository.save(category);
    this.pino.info("CATEGORY CREATED", category);
    return category;
  }

}
