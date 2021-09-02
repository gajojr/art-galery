import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getTasks(@Query() filterDto: GetPostsFilterDto): Promise<PostEntity[]> {
    return this.postsService.getPosts(filterDto);
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
