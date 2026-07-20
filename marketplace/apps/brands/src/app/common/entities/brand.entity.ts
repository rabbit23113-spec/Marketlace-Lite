import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class BrandEntity {
  @PrimaryGeneratedColumn("uuid", {name: "brand_id"})
  brandId: string;

  @Column({name: "name"})
  name: string;

  @Column({name: "description"})
  description: string;

  @Column({name: "image_url"})
  imageUrl: string;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;
}
