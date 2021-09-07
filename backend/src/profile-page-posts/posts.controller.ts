import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
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

@Controller('profile-page-posts')
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

  @Post('/create-post')
  @UseInterceptors(FileInterceptor('imageToPost'))
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PostEntity> {
    return this.postsService.createPost(createPostDto, user, file.path);
  }

  @Delete('/:id')
  deletePost(
    @Param('id') id: string,
    @Query('documentLocation') documentLocation: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.postsService.deletePost(id, user, documentLocation);
  }
}
