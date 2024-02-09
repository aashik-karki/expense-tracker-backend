import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateIncomeCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
