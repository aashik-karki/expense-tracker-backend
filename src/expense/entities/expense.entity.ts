import { ExpenseCategory } from 'src/expense-category/entities/expense-category.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ExpenseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'enum', enum: ['paid', 'advance', 'outstanding'] })
  status: string;

  @Column({ type: 'enum', enum: ['cash', 'cheque', 'banktransfer'] })
  paymentmethod: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(
    () => ExpenseCategory,
    (expenseCategory) => expenseCategory.expenses,
  )
  expenseCategory: ExpenseCategory;
}
