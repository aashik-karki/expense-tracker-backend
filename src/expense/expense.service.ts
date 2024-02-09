import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ExpenseEntity } from './entities/expense.entity';
import { ExpenseCategoryService } from 'src/expense-category/expense-category.service';
import { ExpenseCategory } from 'src/expense-category/entities/expense-category.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly ExpenseRepository: Repository<ExpenseEntity>,
    private readonly expenseCategoryService: ExpenseCategoryService,
    private readonly dataSoucrce: DataSource,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    return await this.ExpenseRepository.save(createExpenseDto);
  }

  findAll() {
    return this.ExpenseRepository.find();
  }

  findOne(id: number) {
    return this.ExpenseRepository.findOneBy({ id });
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return this.update(id, updateExpenseDto);
  }

  remove(id: number) {
    return this.ExpenseRepository.delete(id);
  }
}
