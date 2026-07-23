import {FindOneByIdQuery} from "../queries/findOneById.query";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {DeliveryEntity} from "../../common/entities/delivery.entity";
import {Repository} from "typeorm";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(FindOneByIdQuery)
export class FindOneByIdHandler implements IQueryHandler<FindOneByIdQuery> {
  constructor(@InjectRepository(DeliveryEntity) private readonly repository: Repository<DeliveryEntity>) {
  }

  async execute(query: FindOneByIdQuery): Promise<DeliveryEntity> {
    const {deliveryId} = query;
    const delivery: DeliveryEntity | null = await this.repository.findOneBy({deliveryId});
    if (!delivery) throw new NotFoundException("Delivery not found");

    return delivery;
  }
}
