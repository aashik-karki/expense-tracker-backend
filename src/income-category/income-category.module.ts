import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { IncomeCategoryService } from './income-category.service';
import { IncomeCategoryController } from './income-category.controller';
import { IncomeCategory } from './entities/income-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IncomeCategory])],
  controllers: [IncomeCategoryController],
  providers: [IncomeCategoryService],
  exports: [IncomeCategoryService],
})
export class IncomeCategoryModule {}
