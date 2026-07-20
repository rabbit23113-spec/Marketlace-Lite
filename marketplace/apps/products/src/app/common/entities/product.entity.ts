import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn("uuid", {name: 'product_id'})
  productId: string;

  @Column({name: "name"})
  name: string;

  @Column({name: "description"})
  description: string;

  @Column({name: "price"})
  price: number;

  @Column({name: "image_url"})
  imageUrl: string;

  @Column({name: "category_id", nullable: true})
  categoryId: string;

  @Column({name: "brand_id", nullable: true})
  brandId: string;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;
}
