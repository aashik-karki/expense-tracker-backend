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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('income-category')
export class IncomeCategoryController {
  constructor(private readonly incomeCategoryService: IncomeCategoryService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: CreateIncomeCategoryDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createIncomeCategoryDto: CreateIncomeCategoryDto) {
    return this.incomeCategoryService.create(createIncomeCategoryDto);
  }

  @Get()
  @ApiCreatedResponse({
    type: CreateIncomeCategoryDto,
    isArray: true,
  })
  findAll() {
    return this.incomeCategoryService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: CreateIncomeCategoryDto,
    isArray: false,
  })
  findOne(@Param('id') id: string) {
    return this.incomeCategoryService.findOneById(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    description: ' Succesfully update',
    type: CreateIncomeCategoryDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  update(
    @Param('id') id: string,
    @Body() updateIncomeCategoryDto: UpdateIncomeCategoryDto,
  ) {
    return this.incomeCategoryService.update(+id, updateIncomeCategoryDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted Successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  remove(@Param('id') id: string) {
    return this.incomeCategoryService.delete(+id);
  }
}
