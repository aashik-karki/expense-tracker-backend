import { Test, TestingModule } from '@nestjs/testing';
import { IncomeCategoryController } from './income-category.controller';
import { IncomeCategoryService } from './income-category.service';

describe('IncomeCategoryController', () => {
  let controller: IncomeCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomeCategoryController],
      providers: [IncomeCategoryService],
    }).compile();

    controller = module.get<IncomeCategoryController>(IncomeCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
