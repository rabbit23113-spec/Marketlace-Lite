export class CreateOrderDto {
  userId: string;
  productIds: string[];
  status: string;
  amount: number;
}
