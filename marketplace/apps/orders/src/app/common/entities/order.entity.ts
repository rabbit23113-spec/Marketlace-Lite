import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn("uuid", {name: "order_id"})
  orderId: string;

  @Column({name: "user_id"})
  userId: string;

  @Column({name: "product_ids", type: "simple-array"})
  productIds: string[];

  @Column({name: "amount"})
  amount: number;

  @Column({name: "status"})
  status: string;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;
}
