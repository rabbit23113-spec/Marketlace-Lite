import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class SessionEntity {
  @PrimaryGeneratedColumn("uuid", {name: "session_id"})
  sessionId: string;

  @Column({name: "user_id"})
  userId: string;

  @Column({name: "refresh_token_hash"})
  refreshTokenHash: string;

  @Column({name: "revoked_at", nullable: true, type: "timestamptz"})
  revokedAt: Date;

  @Column({name: "rotated_at", nullable: true, type: "timestamptz"})
  rotatedAt: Date;

  @Column({name: "expires_at", type: "timestamptz"})
  expiresAt: Date;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;
}
