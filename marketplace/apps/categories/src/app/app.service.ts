import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CategoryEntity} from "./common/entities/category.entity";
import {FindAllQuery} from "./cqrs/queries/findAll.query";
import {CreateCategoryCommand} from "./cqrs/commands/createCategory.command";

@Injectable()
export class AppService {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.queryBus.execute(new FindAllQuery());
  }

  async create(name: string): Promise<CategoryEntity> {
    return await this.commandBus.execute(new CreateCategoryCommand(name));
  }
}
