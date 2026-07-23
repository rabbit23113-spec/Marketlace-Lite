import {DeliveryStatus} from "../enums/status.enum";

export class CreateDeliveryDto {
  orderId: string;
  status: DeliveryStatus;
  address: string;
}
