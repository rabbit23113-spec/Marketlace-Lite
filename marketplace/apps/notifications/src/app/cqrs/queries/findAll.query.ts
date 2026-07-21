import {Query} from "@nestjs/cqrs";
import {NotificationEntity} from "../../common/entities/notification.entity";

export class FindAllQuery extends Query<NotificationEntity[]> {
  constructor() {
    super();
  }
}
