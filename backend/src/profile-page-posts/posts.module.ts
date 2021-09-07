import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/gallery_images',
    }),
    TypeOrmModule.forFeature([PostsRepository]),
    AuthModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class ProfilePagePostsModule {}
