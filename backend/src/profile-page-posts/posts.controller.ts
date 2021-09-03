import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './post.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getPosts(): Promise<PostEntity[]> {
    return this.postsService.getPosts();
  }

  @Get('/:id')
  async getPostById(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.getPostById(id);
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.createPost(createPostDto);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string): Promise<void> {
    return this.postsService.deletePost(id);
  }
}
