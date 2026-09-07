import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('category')
  async createCategory(@Body() body: { name: string }) {
    return await this.categoryService.createCategory(body.name);
  }

  @Get('categories')
  async getCategories() {
    return await this.categoryService.getCategories();
  }

  @Get('category/:id')
  async getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.getCategoryById(id);
  }

  @Patch('category/:id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name: string },
  ) {
    return await this.categoryService.updateCategory(id, body.name);
  }

  @Delete('category/:id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.deleteCategory(id);
  }
}
