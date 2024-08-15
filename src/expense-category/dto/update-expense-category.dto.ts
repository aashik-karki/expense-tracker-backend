import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseCategoryDto } from './create-expense-category.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateExpenseCategoryDto extends PartialType(
  CreateExpenseCategoryDto,
) {
  @ApiProperty()
  name: string;
  @ApiProperty()
  amount: number;
}
