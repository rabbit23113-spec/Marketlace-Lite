import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class NotificationEntity {
  @PrimaryGeneratedColumn("uuid", {name: "notification_id"})
  notificationId: string;

  @Column({name: "receiver_id"})
  receiverId: string;

  @Column({name: "type"})
  type: string;

  @Column({name: "message"})
  message: string;

  @CreateDateColumn({name: "issue_at"})
  issueAt: string;
}
