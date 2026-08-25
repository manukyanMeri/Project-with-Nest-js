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
import { AuthorService } from './author.service';
import * as authorServiceTypes from './author.service.types';

@Controller()
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post('author')
  async createAuthor(@Body() body: authorServiceTypes.AuthorType) {
    return await this.authorService.createAuthor(body);
  }

  @Get('authors')
  async getAuthors() {
    return await this.authorService.getAuthors();
  }

  @Get('author/:id')
  async getAuthorById(@Param('id', ParseIntPipe) id: number) {
    return await this.authorService.getAuthorById(id);
  }

  @Patch('author/:id')
  async updateAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: authorServiceTypes.AuthorType,
  ) {
    return await this.authorService.updateAuthor(id, body);
  }

  @Delete('author/:id')
  async deleteAuthor(@Param('id', ParseIntPipe) id: number) {
    return await this.authorService.deleteAuthor(id);
  }
}
