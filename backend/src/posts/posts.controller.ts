import { Body, Controller, Get, Post } from '@nestjs/common';
import { Post as PostInterface } from './post.model';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAllPosts(): PostInterface[] {
    return this.postsService.getAllPosts();
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto): PostInterface {
    return this.postsService.createPost(createPostDto);
  }
}
