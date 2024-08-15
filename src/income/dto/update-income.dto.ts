import { PartialType } from '@nestjs/mapped-types';
import { CreateIncomeDto } from './create-income.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateIncomeDto extends PartialType(CreateIncomeDto) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  incomeCategoryId: number;
}
