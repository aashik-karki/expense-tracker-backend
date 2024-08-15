import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExpenseCategoryService } from './expense-category.service';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

ApiTags('Expense-Category');
@Controller('expense-category')
export class ExpenseCategoryController {
  constructor(
    private readonly expenseCategoryService: ExpenseCategoryService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: CreateExpenseCategoryDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createExpenseCategoryDto: CreateExpenseCategoryDto) {
    return this.expenseCategoryService.create(createExpenseCategoryDto);
  }

  @Get()
  @ApiCreatedResponse({
    type: CreateExpenseCategoryDto,
    isArray: true,
  })
  findAll() {
    return this.expenseCategoryService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: CreateExpenseCategoryDto,
    isArray: false,
  })
  findOne(@Param('id') id: string) {
    return this.expenseCategoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: UpdateExpenseCategoryDto,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  update(
    @Param('id') id: string,
    @Body() updateExpenseCategoryDto: UpdateExpenseCategoryDto,
  ) {
    return this.expenseCategoryService.update(+id, updateExpenseCategoryDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted Successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  remove(@Param('id') id: string) {
    return this.expenseCategoryService.remove(+id);
  }
}
