import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {DeliveryStatus} from "../enums/status.enum";

@Entity()
export class DeliveryEntity {
  @PrimaryGeneratedColumn("uuid", {name: "delivery_id"})
  deliveryId: string;

  @Column({name: "order_id", unique: true})
  orderId: string;

  @Column({name: "status", type: "enum", enum: DeliveryStatus})
  status: DeliveryStatus;

  @Column({name: "address"})
  address: string;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;
}
