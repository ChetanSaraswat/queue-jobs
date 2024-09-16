import { Entity, Column, PrimaryGeneratedColumn, Generated, OneToOne, CreateDateColumn, JoinColumn, UpdateDateColumn } from 'typeorm';;
import { User } from '../user/user.entity';
import { Balance } from './account-balance';
@Entity('account')
export class Account {

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  bank_name: string;

  @Column({ unique: true })
  @Generated('uuid')
  account_number: string;

  @Column('decimal', { precision: 12, scale: 2, transformer: {
    to: (balance: Balance): number => balance.getValue(),
    from: (value: number): Balance => new Balance(value)
  }})
  balance: Balance;

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
