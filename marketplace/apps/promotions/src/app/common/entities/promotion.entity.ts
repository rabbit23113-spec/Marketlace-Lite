import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class PromotionEntity {
  @PrimaryGeneratedColumn("uuid", {name: "promotion_id"})
  promotionId: string;

  @Column({name: "name"})
  name: string;

  @Column({name: "description"})
  description: string;

  @Column({name: "user_id", nullable: true})
  userId: string;

  @Column({name: "product_id", nullable: true})
  productId: string;

  @Column({name: "brand_id", nullable: true})
  brandId: string;

  @Column({name: "category_id", nullable: true})
  categoryId: string;

  @Column({name: "percent"})
  percent: number;

  @Column({name: "expires_at"})
  expiresAt: Date;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;
}
