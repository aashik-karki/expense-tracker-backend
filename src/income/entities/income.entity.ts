import { IncomeCategory } from 'src/income-category/entities/income-category.entity';
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
export class Income {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'enum', enum: ['Accured', 'receive', 'outstanding'] })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @Column({ type: 'int' })
  incomeCategoryId: number;

  @ManyToOne(() => IncomeCategory, (incomeCategory) => incomeCategory.income)
  incomeCategory: IncomeCategory;
}
