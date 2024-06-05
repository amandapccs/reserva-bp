import { Roles } from '../../shared/constants/roles';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  familyName: string;

  @Column({ type: 'text' })
  givenName: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', default: 'secretpassword' })
  password: string;

  @Column({ type: 'text', nullable: true })
  pictureUrl: string | null;

  @Column({ type: 'enum', enum: Roles, default: Roles.CLIENT })
  role: Roles;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date;
}
