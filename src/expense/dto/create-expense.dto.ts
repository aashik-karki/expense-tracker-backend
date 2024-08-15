import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  amount: number;

  @IsString()
  @IsEnum(['paid', 'advance', 'outstanding'])
  @ApiProperty()
  status: string;

  @IsString()
  @IsEnum(['cash', 'cheque', 'banktransfer'])
  @ApiProperty()
  paymentmethod: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  expenseCategoryId: number;
}
