import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AuthorType } from './author.service.types';

@Injectable()
export class AuthorService {
  constructor(private readonly db: DbService) {}
  async createAuthor(body: AuthorType) {
    // Check required fields
    if (!body.name?.trim() || !body.bio?.trim()) {
      throw new BadRequestException('Name and bio are required fields');
    }

    // Check if author already exists
    const existingAuthor = await this.db.author.findFirst({
      where: {
        name: body.name,
      },
    });

    if (existingAuthor) {
      throw new BadRequestException('Author already exists');
    }

    // Create new author
    return await this.db.author.create({
      data: {
        name: body.name,
        bio: body.bio,
      },
    });
  }

  async getAuthors() {
    const authors = await this.db.author.findMany();
    // Check if authors exist
    if (authors.length === 0) {
      throw new BadRequestException('No authors found');
    }

    return authors;
  }

  async getAuthorById(id: number) {
    // Check if ID is provided
    if (!id) {
      throw new BadRequestException('Author ID is required');
    }

    // Check if author exists
    const author = await this.db.author.findUnique({
      where: {
        id,
      },
    });

    // Check if author is found
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return author;
  }

  async updateAuthor(id: number, body: AuthorType) {
    // Check if ID is provided
    if (!id) {
      throw new BadRequestException('Author ID is required');
    }

    // Check if author exists
    const existingAuthor = await this.db.author.findUnique({
      where: {
        id,
      },
    });

    if (!existingAuthor) {
      throw new NotFoundException('Author not found');
    }

    // Update author
    if (body.name?.trim() || body.bio?.trim()) {
      return await this.db.author.update({
        where: {
          id,
        },
        data: {
          name: body.name?.trim() || existingAuthor.name,
          bio: body.bio?.trim() || existingAuthor.bio,
        },
      });
    } else {
      throw new BadRequestException(
        'At least one of the fields must be provided for update',
      );
    }
  }

  async deleteAuthor(id: number) {
    // Check if ID is provided
    if (!id) {
      throw new BadRequestException('Author ID is required');
    }

    // Check if author exists
    const existingAuthor = await this.db.author.findUnique({
      where: {
        id,
      },
    });

    // Check if author is found
    if (!existingAuthor) {
      throw new NotFoundException('Author not found');
    }

    // Delete author
    return await this.db.author.delete({
      where: {
        id,
      },
    });
  }
}
