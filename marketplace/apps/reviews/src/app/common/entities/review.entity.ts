import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class ReviewEntity {
  @PrimaryGeneratedColumn("uuid", {name: "review_id"})
  reviewId: string;

  @Column({name: "user_id"})
  userId: string;

  @Column({name: "product_id"})
  productId: string;

  @Column({name: "message"})
  message: string;

  @Column({name: "rate"})
  rate: number;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;
}
