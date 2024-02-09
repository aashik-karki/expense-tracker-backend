import { Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Income } from './entities/income.entity';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private readonly IncomeRepository: Repository<Income>,
  ) {}

  create(createIncomeDto: CreateIncomeDto) {
    return this.IncomeRepository.save(createIncomeDto);
  }

  findAll() {
    return this.IncomeRepository.find();
  }

  findOne(id: number) {
    return this.IncomeRepository.findOneBy({ id });
  }

  update(id: number, updateIncomeDto: UpdateIncomeDto) {
    return this.IncomeRepository.update(id, updateIncomeDto);
  }

  remove(id: number) {
    return this.IncomeRepository.delete(id);
  }
}
