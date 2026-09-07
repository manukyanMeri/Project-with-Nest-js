import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class CategoryService {
  constructor(private readonly db: DbService) {}

  async createCategory(name: string) {
    // Check if category already exists
    const existingCategory = await this.db.category.findFirst({
      where: {
        name: name,
      },
    });

    if (existingCategory) {
      throw new Error('Category already exists');
    }

    // Create new category
    return await this.db.category.create({
      data: {
        name: name,
      },
    });
  }

  async getCategories() {
    const categories = await this.db.category.findMany();

    if (categories.length === 0) {
      throw new NotFoundException('No categories found');
    }

    return categories;
  }

  async getCategoryById(id: number) {
    // Check if ID is provided
    if (!id) {
      throw new Error('Category ID is required');
    }

    // Check if category exists
    const category = await this.db.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    return category;
  }

  async updateCategory(id: number, name: string) {
    // Check if ID is provided
    if (!id) {
      throw new Error('Category ID is required');
    }

    // Check if category exists
    const existingCategory = await this.db.category.findUnique({
      where: {
        id,
      },
    });

    if (!existingCategory) {
      throw new Error('Category not found');
    }

    // Update category
    await this.db.category.update({
      where: {
        id,
      },
      data: {
        name: name,
      },
    });

    return { message: 'Category updated successfully' };
  }

  async deleteCategory(id: number) {
    // Check if ID is provided
    if (!id) {
      throw new Error('Category ID is required');
    }

    // Check if category exists
    const existingCategory = await this.db.category.findUnique({
      where: {
        id,
      },
    });

    if (!existingCategory) {
      throw new NotFoundException('Category not found');
    }

    // Delete category
    await this.db.category.delete({
      where: {
        id,
      },
    });

    return { message: 'Category deleted successfully' };
  }
}
