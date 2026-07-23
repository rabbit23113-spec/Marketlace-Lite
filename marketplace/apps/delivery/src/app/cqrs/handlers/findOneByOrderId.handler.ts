import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindOneByOrderIdQuery} from "../queries/findOneByOrderId.query";
import {InjectRepository} from "@nestjs/typeorm";
import {DeliveryEntity} from "../../common/entities/delivery.entity";
import {Repository} from "typeorm";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(FindOneByOrderIdQuery)
export class FindOneByOrderIdHandler implements IQueryHandler<FindOneByOrderIdQuery> {
  constructor(@InjectRepository(DeliveryEntity) private readonly repository: Repository<DeliveryEntity>) {
  }

  async execute(query: FindOneByOrderIdQuery): Promise<DeliveryEntity> {
    const {orderId} = query;
    const delivery: DeliveryEntity | null = await this.repository.findOneBy({orderId});
    if (!delivery) throw new NotFoundException("Delivery not found");

    return delivery;
  }
}
