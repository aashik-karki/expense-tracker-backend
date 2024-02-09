import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IncomeCategoryService } from './income-category.service';
import { CreateIncomeCategoryDto } from './dto/create-income-category.dto';
import { UpdateIncomeCategoryDto } from './dto/update-income-category.dto';

@Controller('income-category')
export class IncomeCategoryController {
  constructor(private readonly incomeCategoryService: IncomeCategoryService) {}

  @Post()
  create(@Body() createIncomeCategoryDto: CreateIncomeCategoryDto) {
    return this.incomeCategoryService.create(createIncomeCategoryDto);
  }

  @Get()
  findAll() {
    return this.incomeCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incomeCategoryService.findOneById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIncomeCategoryDto: UpdateIncomeCategoryDto,
  ) {
    return this.incomeCategoryService.update(+id, updateIncomeCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incomeCategoryService.delete(+id);
  }
}
