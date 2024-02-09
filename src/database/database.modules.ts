import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseCategory } from 'src/expense-category/entities/expense-category.entity';
import { ExpenseEntity } from 'src/expense/entities/expense.entity';
import { IncomeCategory } from 'src/income-category/entities/income-category.entity';
import { Income } from 'src/income/entities/income.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'expense_tracker',
      entities: [User, ExpenseCategory, IncomeCategory, ExpenseEntity, Income],
      synchronize: true,
    }),
  ],
})
export class databaseModule {}
