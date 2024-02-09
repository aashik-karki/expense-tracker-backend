import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateIncomeCategoryDto } from './dto/create-income-category.dto';
import { UpdateIncomeCategoryDto } from './dto/update-income-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { IncomeCategory } from './entities/income-category.entity';
import {
  FindManyOptions,
  FindOneWhereOptions,
  FindRelationsOptions,
} from 'src/repository/type-def';
@Injectable()
export class IncomeCategoryService {
  constructor(
    @InjectRepository(IncomeCategory)
    private readonly IncomeCategoryRepository: Repository<IncomeCategory>,
  ) {}

  async create(createIncomeCategoryDto: CreateIncomeCategoryDto) {
    const categoryName = await this.findUserByName(
      createIncomeCategoryDto.name,
    );
    console.log('this is a categoryName', categoryName);
    if (!categoryName) {
      try {
        await this.IncomeCategoryRepository.save(createIncomeCategoryDto);
        return { message: 'you have successfully create incomeCategory' };
      } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_ACCEPTABLE,
            error: 'error occur during creating category',
          },
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    } else {
      throw new HttpException(
        {
          Status: HttpStatus.NOT_ACCEPTABLE,
          Error: 'Categoryname already exist',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  public async findUserByName(name: string) {
    const categoryName = await this.IncomeCategoryRepository.findOneBy({
      name: ILike(name),
    });
    if (categoryName.name === name) {
      return true;
    }
  }

  findAll() {
    return this.IncomeCategoryRepository.find();
  }

  public async findOne(
    where: FindOneWhereOptions<IncomeCategory>,
    relations?: FindRelationsOptions<IncomeCategory>,
  ): Promise<IncomeCategory> {
    return await this.IncomeCategoryRepository.findOne({
      where,
      relations,
    });
  }

  findOneById(id: number) {
    return this.IncomeCategoryRepository.findOneBy({ id });
  }

  update(id: number, updateIncomeCategoryDto: UpdateIncomeCategoryDto) {
    return this.IncomeCategoryRepository.update(id, updateIncomeCategoryDto);
  }

  async delete(id: number) {
    const incomeCategorytToRemove = await this.IncomeCategoryRepository.findOne(
      { where: { id }, relations: ['income'] },
    );
    if (!incomeCategorytToRemove) {
      throw new HttpException(
        {
          Status: HttpStatus.NOT_FOUND,
          Error: 'Category doesnt exist',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    console.log('this is a income category', incomeCategorytToRemove);
    return this.IncomeCategoryRepository.remove(incomeCategorytToRemove);
  }
}
