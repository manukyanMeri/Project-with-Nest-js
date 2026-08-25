import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { DBModule } from 'src/db/db.module';

@Module({
  controllers: [AuthorController],
  providers: [AuthorService],
  imports: [DBModule],
})
export class AuthorModule {}
