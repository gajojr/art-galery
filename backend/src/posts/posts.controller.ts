import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Post as PostInterface } from './post.model';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getPosts(@Query() filterDto: GetPostsFilterDto): PostInterface[] {
    if (Object.keys(filterDto).length) {
      return this.postsService.getPostsWithFilters(filterDto);
    } else {
      return this.postsService.getAllPosts();
    }
  }

  @Get('/:id')
  getPostById(@Param('id') id: string): PostInterface {
    return this.postsService.getPostById(id);
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto): PostInterface {
    return this.postsService.createPost(createPostDto);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string): void {
    return this.postsService.deletePost(id);
  }
}
