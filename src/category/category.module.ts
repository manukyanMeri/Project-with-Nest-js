import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { Category } from './category';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [Category, CategoryService],
})
export class CategoryModule {}
