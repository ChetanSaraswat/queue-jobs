import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Generated, CreateDateColumn, JoinColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { TransactionType } from './enum/transaction-type.enum';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  transaction_uuid: string;

  @Column()
  transaction_type: TransactionType;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  transaction_date: Date;

  @Column('decimal', { precision: 12, scale: 2 })
  balance_after_transaction: number;

  @ManyToOne(() => User, (user) => user.uuid)
  @JoinColumn({ name: 'credited_user_id' })  
  credited_user_id: User;

  @ManyToOne(() => User, (user) => user.uuid)
  @JoinColumn({ name: 'debited_user_id' })  
  debited_user_id: User;

  @Column()
  credited_bank_account: string;

  @Column()
  debited_bank_account: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
