import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Generated, OneToOne, CreateDateColumn, JoinColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';;

import { User } from '../user/user.entity';
import { Min } from 'class-validator';

@Entity('account')
export class Account {

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  bank_name: string;

  @Column({ unique: true })
  @Generated('uuid')
  account_number: string;

  @Column('decimal', { precision: 12, scale: 2 })
  @Min(0, { message: 'Balance cannot be less than 0' })
  balance: number;

  @Column()
  description: string;

  @OneToOne(() => User, (user)=>user.uuid)
  @JoinColumn({ name: 'user_id' })  
  user_id: User;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
