export class CreateWarehouseDto {
  name: string;
  address: string;
  city: string;
  state: string;
  status: "open" | "closed";
}
