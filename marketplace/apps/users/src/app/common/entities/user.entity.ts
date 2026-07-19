import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Roles} from "../enums/roles.enum";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', {name: 'user_id'})
  userId: string;

  @Column({name: 'first_name'})
  firstName: string;

  @Column({name: 'middle_name', nullable: true})
  middleName: string;

  @Column({name: 'last_name'})
  lastName: string;

  @Column({name: 'email', unique: true})
  email: string;

  @Column({name: 'password_hash'})
  passwordHash: string;

  @Column({name: "is_verified", default: false})
  isVerified: boolean;

  @Column({name: "role", type: "simple-enum", enum: Roles, default: Roles.CUSTOMER})
  role: Roles

  @Column({name: "image_url", default: ""})
  imageUrl: string;

  @Column({name: "addresses", type: "simple-array", default: []})
  addresses: string[];

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;
}
