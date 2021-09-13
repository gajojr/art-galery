import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PostsRepository } from './posts.repository';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PostsRepository]), AuthModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
