import {Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export class EventEntity {
  @PrimaryGeneratedColumn("uuid", {name: "event_id"})
  eventId: string;

  @Column({name: "domain"})
  domain: string;

  @Column({name: "action"})
  action: string;

  @Column({name: "payload", type: "jsonb", nullable: true})
  payload: any;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;
}
