import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn("uuid", {name: "category_id"})
  categoryId: string;

  @Column({name: "name", unique: true})
  name: string;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;
}
