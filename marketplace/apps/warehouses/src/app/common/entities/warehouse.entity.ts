import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class WarehouseEntity {
  @PrimaryGeneratedColumn("uuid", {name: "warehouse_id"})
  warehouseId: string;

  @Column({name: "name"})
  name: string;

  @Column({name: "address"})
  address: string;

  @Column({name: "city"})
  city: string;

  @Column({name: "state"})
  state: string;

  @Column({name: "status"})
  status: "open" | "closed";

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;
}
