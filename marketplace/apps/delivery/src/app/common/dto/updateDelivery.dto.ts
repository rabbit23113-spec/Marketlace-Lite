import {DeliveryStatus} from "../enums/status.enum";

export class UpdateDeliveryDto {
  status?: DeliveryStatus;
  address?: string;
}
