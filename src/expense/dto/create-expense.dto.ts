import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsEnum(['paid', 'advance', 'outstanding'])
  status: string;

  @IsString()
  @IsEnum(['cash', 'cheque', 'banktransfer'])
  paymentmethod: string;

  @IsNumber()
  @IsNotEmpty()
  expenseCategoryId: number;
}
