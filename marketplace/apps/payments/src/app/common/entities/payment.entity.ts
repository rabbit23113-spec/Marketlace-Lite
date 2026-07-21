import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class PaymentEntity {
  @PrimaryGeneratedColumn("uuid", {name: "payment_id"})
  paymentId: string;

  @Column({name: "provider"})
  provider: string;

  @Column({name: "provider_payment_id"})
  providerPaymentId: string;

  @Column({name: "order_id"})
  orderId: string;

  @Column({name: "user_id"})
  userId: string;

  @Column({name: "status"})
  status: string;

  @Column({name: "amount"})
  amount: number;

  @Column({name: "currency"})
  currency: string;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;
}
