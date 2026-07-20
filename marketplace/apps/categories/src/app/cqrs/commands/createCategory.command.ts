import {Command} from "@nestjs/cqrs";
import {CategoryEntity} from "../../common/entities/category.entity";

export class CreateCategoryCommand extends Command<CategoryEntity> {
  constructor(public readonly name: string) {
    super();
  }
}
