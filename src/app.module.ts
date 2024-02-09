import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseModule } from './database/database.modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ExpenseModule } from './expense/expense.module';
import { ExpenseCategoryModule } from './expense-category/expense-category.module';
import { IncomeCategoryModule } from './income-category/income-category.module';
import { IncomeModule } from './income/income.module';

@Module({
  imports: [
    databaseModule,
    UserModule,
    AuthModule,
    ExpenseModule,
    ExpenseCategoryModule,
    IncomeCategoryModule,
    IncomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
