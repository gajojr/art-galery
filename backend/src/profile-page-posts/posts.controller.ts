import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './post.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getPosts(@GetUser() user: User): Promise<PostEntity[]> {
    return this.postsService.getPosts(user);
  }

  @Get('/:id')
  async getPostById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    return this.postsService.getPostById(id, user);
  }

  @Post()
  @UseInterceptors(FileInterceptor('imageToPost'))
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PostEntity> {
    console.log(file);
    return this.postsService.createPost(createPostDto, user);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.postsService.deletePost(id, user);
  }
}