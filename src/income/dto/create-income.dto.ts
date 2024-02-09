import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateIncomeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsEnum(['paid', 'advance', 'outstanding'])
  status: string;

  @IsNumber()
  @IsNotEmpty()
  incomeCategoryId: number;
}
