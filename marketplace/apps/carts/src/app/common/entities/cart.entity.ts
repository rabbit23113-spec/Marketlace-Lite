import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn("uuid", {name: "cart_id"})
  cartId: string;

  @Column({name: "user_id"})
  userId: string;

  @Column({name: "product_ids", type: "simple-array", default: []})
  productIds

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;
}
