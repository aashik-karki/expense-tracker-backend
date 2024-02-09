import { Injectable, Delete } from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { ExpenseCategory } from './entities/expense-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseCategoryService {
  constructor(
    @InjectRepository(ExpenseCategory)
    private readonly ExpenseCategoryRepository: Repository<ExpenseCategory>,
  ) {}

  create(createExpenseCategoryDto: CreateExpenseCategoryDto) {
    return this.ExpenseCategoryRepository.save(createExpenseCategoryDto);
  }

  findAll() {
    return this.ExpenseCategoryRepository.find();
  }

  findOne(id: number) {
    return this.ExpenseCategoryRepository.findOneBy({ id });
  }

  update(id: number, updateExpenseCategoryDto: UpdateExpenseCategoryDto) {
    return this.ExpenseCategoryRepository.update(id, updateExpenseCategoryDto);
  }
  remove(id: number) {
    return this.ExpenseCategoryRepository.delete(id);
  }
}
