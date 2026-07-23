import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class InventoryEntity {
  @PrimaryGeneratedColumn("uuid", {name: "inventory_id"})
  inventoryId: string;

  @Column({name: "warehouse_id"})
  warehouseId: string;

  @Column({name: "product_id"})
  productId: string;

  @Column({name: "quantity"})
  quantity: number;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;
}
